import { tool } from "ai"
import { z } from "zod"
import QRCode from "qrcode"

export const QrcodeGenerateTool = tool({
  description: "Gera um QR Code a partir de um texto, link ou JSON fornecido.",
  inputSchema: z.object({
    value: z.string().describe("Valor que será convertido em QR Code (texto, link ou JSON)"),
    width: z.number().optional().default(300).describe("Largura do QR Code em pixels"),
    color: z
      .object({
        dark: z.string().default("#000000").describe("Cor dos módulos escuros"),
        light: z.string().default("#ffffff").describe("Cor de fundo"),
      })
      .optional(),
  }),

  async *execute({ value, width, color }) {
    yield {
      state: "generating" as const,
      description: "Gerando QR Code...",
    }

    const qrCodeBase64 = await QRCode.toDataURL(value, {
      width: width ?? 300,
      margin: 2,
      color: color ?? { dark: "#000000", light: "#ffffff" },
    })

    yield {
      state: "ready" as const,
      qrCodeBase64,
      geradoEm: new Date().toISOString(),
      description: "QR Code gerado com sucesso",
    }

    return "Qrcode gerado com sucesso"
  },
})
