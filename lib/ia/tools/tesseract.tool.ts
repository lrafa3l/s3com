import { tool } from "ai";
import { z } from "zod";

export const TesseractTool = tool({
  description: "Reconhece texto em uma imagem (OCR) usando Tesseract.js no frontend.",
  inputSchema: z.object({
    imageUrl: z.string().url().optional(),
    imageBase64: z.string().optional(),
    lang: z.string().default("eng"),
  }).refine(data => data.imageUrl || data.imageBase64, {
    message: "É necessário fornecer `imageUrl` ou `imageBase64`.",
  }),

  async *execute({ imageUrl, imageBase64 }) {
    yield {
      state: "loading",
      description: "Carregando imagem para OCR...",
    };

    const imagePath = imageBase64
      ? (imageBase64.startsWith("data:image/") ? imageBase64 : `data:image/png;base64,${imageBase64}`)
      : imageUrl!;

    yield {
      state: "ready",
      description: "Imagem pronta para processamento OCR no cliente.",
      imageBase64: imagePath,
      geradoEm: new Date().toISOString(),
    };
  },
});
