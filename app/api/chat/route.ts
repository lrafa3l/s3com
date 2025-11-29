// import { ChromeTool } from "@/lib/ia/tools/Chrome"
// import { RemoveBackgroundTool } from "@/lib/ia/tools/movebg.tool"
// import { QrcodeGenerateTool } from "@/lib/ia/tools/qrcodeGenerate.tool"
// import { queryDbTool } from "@/lib/ia/tools/queryDb.tool"
// import { TesseractTool } from "@/lib/ia/tools/tesseract.tool"
// import { TTSTool } from "@/lib/ia/tools/tts.tool"
import { getModel } from "@/lib/ia/config"
import { convertToModelMessages, streamText } from "ai"
import type { NextRequest } from "next/server"
import z from "zod"

export const maxDuration = 30

const SYSTEM_PROMPT = `
Você é a assistente virtual da Sara3com — uma empresa especializada em telecomunicações, conectividade empresarial e inovação tecnológica.

Sua função é ajudar visitantes e clientes do site a:
- Entender os serviços da Sara3com, como internet dedicada, VoIP, VPN, IoT e soluções corporativas de rede;
- Tirar dúvidas sobre planos, suporte técnico e infraestrutura de conectividade;
- Ajudar o usuário a encontrar artigos, tutoriais e conteúdos informativos no blog ou na central de conhecimento;
- Orientar novos clientes sobre como contratar serviços ou entrar em contato com a equipe comercial.

Comportamento esperado:
- Use uma linguagem clara, amigável e profissional;
- Mantenha um tom acolhedor e informativo;
- Resuma respostas longas e ofereça links ou exemplos sempre que possível;
- Quando o usuário fizer perguntas amplas, ofereça opções ou sugestões relevantes;
- Evite jargões técnicos, a menos que o cliente demonstre conhecimento avançado.

Contexto:
- O site oficial é https://sara3com.vercel.app;
- A Sara3com é reconhecida por seu lema: “Sua Conexão, Nossa Inovação. Tecnologia que Protege e Transforma o Futuro.”;
- Valores: inovação, segurança, desempenho e suporte humano.

Seu objetivo é transformar cada conversa em uma experiência informativa e acolhedora.


Instrucoes
- Se o usuário informar o nome, use-o para se dirigir a ele pelo ultimo nome em negrito quando apropriado. Responda de forma clara, direta e contextualizada.
`

const AttachmentSchema = z.object({
  name: z.string(),
  type: z.string(),
  data: z.string(), // base64
  mediaType: z.enum(['image', 'video', 'file'])
})

const BodySchema = z.object({
  messages: z.array(z.any()),
  model: z.string(),
  name: z.string().optional(),
  webSearch: z.boolean().optional(),
  attachments: z.array(AttachmentSchema).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = BodySchema.safeParse(body)

    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          error: "Parâmetros inválidos",
          details: parsed.error.format(),
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    const { messages, model, name } = parsed.data

    let systemMessageWithAttachments = SYSTEM_PROMPT

    if (name) {
      systemMessageWithAttachments += `\n* NOTA: O nome do usuário é ${name}.`
    }


    const stream = streamText({
      model: getModel(model),
      messages: convertToModelMessages(messages),
      system: systemMessageWithAttachments,
    })

    return stream.toUIMessageStreamResponse({
      sendSources: true,
      sendReasoning: true,
    })
  } catch (error: any) {
    console.error("Erro no endpoint de chat:", error)
    return new Response(
      JSON.stringify({
        error: "Erro interno do servidor",
        ...(process.env.NODE_ENV === "development" && { details: error.message }),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}