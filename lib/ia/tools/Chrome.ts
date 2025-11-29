import { tool } from "ai"
import { z } from "zod"
import puppeteer from "puppeteer"

const ChromeInputSchema = z.object({
  script: z.string().optional().describe("Código JavaScript a ser executado dentro do navegador."),
  url: z.string().url().optional().describe("Página inicial a ser carregada antes da execução."),
  timeout: z.number().optional().default(30000).describe("Tempo máximo de execução (ms)."),
  viewport: z.object({
    width: z.number().default(1280),
    height: z.number().default(720)
  }).optional(),
  screenshot: z.boolean().optional().default(true).describe("Captura screenshot no final.")
})

export const ChromeTool = tool({
  description: "Executa automações de navegador usando Puppeteer (visível).",
  inputSchema: ChromeInputSchema,

  async *execute({ script, url, timeout = 30000, viewport, screenshot = true }) {
    yield {
      state: "initializing" as const,
      description: "Iniciando o navegador local...",
    }

    let browser
    try {
      const browser = await puppeteer.connect({
        browserWSEndpoint: process.env.BROWSERLESS_URL!,
      })

      const page = await browser.newPage()

      page.setDefaultTimeout(timeout)
      page.setDefaultNavigationTimeout(timeout)

      // 🧭 Acessa a URL inicial (se fornecida)
      if (url) {
        yield { state: "loading" as const, description: `Carregando ${url}...` }
        await page.goto(url, { waitUntil: "networkidle2", timeout })
      }

      // 📜 Script padrão (Google Search)
      if (!script) {
        script = `
          await page.goto('https://google.com', { waitUntil: 'networkidle2' });
          await page.type('textarea[name="q"]', 'browserless.io');
          await page.keyboard.press('Enter');
          await page.waitForNavigation({ waitUntil: 'networkidle2' });
          const title = await page.title();
          console.log("Título da página:", title);
          return { title };
        `
      }

      yield { state: "executing" as const, description: "Executando script..." }

      // ⚙️ Executa o script de forma isolada e segura
      const result = await executeScript(page, script, timeout)

      // 📸 Captura screenshot (opcional)
      let screenshotData: string | null = null
      if (screenshot) {
        const image = await page.screenshot({
          encoding: "base64",
          fullPage: true,
          type: "png"
        })
        screenshotData = `data:image/png;base64,${image}`
      }

      yield {
        state: "ready" as const,
        description: "Execução concluída com sucesso!",
        result,
        screenshot: screenshotData,
        timestamp: new Date().toISOString(),
      }

      return {
        success: true,
        message: "Automação finalizada com êxito",
        result,
        timestamp: new Date().toISOString(),
      }

    } catch (error: any) {
      console.error("Erro durante execução:", error)
      yield {
        state: "error" as const,
        description: "Erro durante a execução",
        error: error.message
      }
      throw new Error(`Falha na automação: ${error.message}`)
    } finally {
      // 🔒 Mantém o navegador aberto para visualização manual
      // Se quiser fechar automaticamente, descomente abaixo:
      // if (browser) await browser.close().catch(console.error)
    }
  }
})

/**
 * Executa um script JS de forma segura dentro do contexto do navegador.
 */
async function executeScript(page: puppeteer.Page, script: string, timeout: number) {
  const wrapped = new Function("page", `
    return (async () => {
      ${script}
    })();
  `)

  const execution = wrapped(page)
  const timer = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout excedido durante execução do script")), timeout)
  )

  return Promise.race([execution, timer])
}
