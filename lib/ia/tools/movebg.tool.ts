import { tool } from "ai"
import { z } from "zod"

export const RemoveBackgroundTool = tool({
  description: "Remove o fundo de uma imagem usando a API remove.bg.",
  inputSchema: z.object({
    imageUrl: z.string().url().optional().describe("URL da imagem a ser processada."),
    imageBase64: z.string().optional().describe("Imagem em base64 (alternativa ao uso da URL)."),
    size: z.enum(["auto", "preview", "small", "medium", "hd", "4k"]).default("auto").describe("Tamanho do resultado."),
  }).refine(
    (data) => data.imageUrl || data.imageBase64,
    "É necessário fornecer `imageUrl` ou `imageBase64`."
  ),

  async *execute({ imageUrl, imageBase64, size }) {
    yield {
      state: "processing" as const,
      description: "Removendo o fundo da imagem...",
    }

    const formData = new FormData()
    formData.append("size", size)

    if (imageUrl) {
      console.log("========================================",imageUrl)
      formData.append("image_url", imageUrl)
    } else if (imageBase64) {
      const buffer = Buffer.from(imageBase64, "base64")
      formData.append("image_file", new Blob([buffer]), "input.png")
    }

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": process.env.REMOVE_BG_API_KEY,
      },
      body: formData,
    })

    if (!response.ok) {
      const err = await response.text()
      throw new Error(`Erro ao remover fundo: ${response.status} - ${err}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString("base64")

    yield {
      state: "ready" as const,
      imageBase64: `data:image/png;base64,${base64}`,
      geradoEm: new Date().toISOString(),
      description: "Fundo removido com sucesso!",
    }

    return "Fundo removido com sucesso."
  },
})
