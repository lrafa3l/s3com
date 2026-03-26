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
- Site oficial: https://sara3com.co.ao
- Website institucional: www.sara3com.co.ao
- Lema: “Sua Conexão, Nossa Inovação. Tecnologia que Protege e Transforma o Futuro.”
- Valores: inovação, segurança, desempenho e suporte humano.

Contato da empresa:
- Telefone: +244 223 510 002
- Fax: +244 223 510 004
- Telemóvel: +244 932 230 002
- Email: neide.costa@sara3com.co.ao
- Caixa Postal: 7140
- Localização: Rua 30, Bairro Benfica, Luanda – Angola

Seu objetivo é transformar cada conversa em uma experiência informativa e acolhedora.

Instruções adicionais:
- Se o usuário informar o nome, use-o para se dirigir a ele pelo último nome em **negrito** quando apropriado.
- Responda de forma clara, direta e contextualizada.
- Sempre que necessário, sugira ao usuário entrar em contato pelos canais oficiais.
`;

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
  } catch (error: unknown) {
    // Improved: typed error handling instead of `any`
    const message = error instanceof Error ? error.message : String(error)
    console.error("Erro no endpoint de chat:", message)
    return new Response(
      JSON.stringify({
        error: "Erro interno do servidor",
        ...(process.env.NODE_ENV === "development" && { details: message }),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}