// TTSTool.js
import { tool } from "ai"
import { z } from "zod"
import * as gtts from "google-tts-api" // 👈 Import correto para ESM

export const TTSTool = tool({
  description: "Converte texto em fala (TTS) e retorna o áudio em base64 sem salvar o arquivo.",
  inputSchema: z.object({
    text: z.string().describe("Texto que será convertido em fala"),
    lang: z.string().optional().default("pt").describe("Idioma (padrão: pt)"),
    slow: z.boolean().optional().default(false).describe("Se a fala deve ser lenta ou normal"),
  }),

  async *execute({ text, lang, slow }) {
    yield {
      state: "generating" as const,
      description: "Gerando áudio com Google TTS...",
    }

    try {
      // ✅ gera URL do áudio
      const url = gtts.getAudioUrl(text, {
        lang,
        slow,
        host: "https://translate.google.com",
      })

      // ✅ busca o áudio
      const res = await fetch(url)
      if (!res.ok) throw new Error("Erro ao baixar áudio: " + res.statusText)
      const arrayBuffer = await res.arrayBuffer()

      // ✅ converte para base64 (sem salvar)
      const base64Audio = Buffer.from(arrayBuffer).toString("base64")
      const audioBase64Url = `data:audio/mp3;base64,${base64Audio}`

      yield {
        state: "ready" as const,
        audioBase64Url,
        description: "Áudio gerado com sucesso",
        geradoEm: new Date().toISOString(),
      }

      return "Audio gerado com sucesso"
    } catch (error: any) {
      yield {
        state: "error" as const,
        description: "Erro ao gerar áudio: " + error.message,
      }
    }
  },
})
