import { tool } from "ai"
import z from "zod"
import { prisma } from "@/lib/prisma"

// Only allow read access to safe, public models
const allowedModels: Record<string, string> = {
  Service: "Serviços oferecidos pela Sara3com. Contém nome, descrição e ícone.",
  Article: "Artigos e conteúdos do blog. Contém título, slug e conteúdo.",
}

export const queryDbTool = tool({
  description: `Consultar dados públicos do banco de dados (somente leitura).

Modelos disponíveis: ${Object.keys(allowedModels).join(", ")}

Use esta ferramenta apenas para buscar informações sobre serviços e artigos.
`,
  inputSchema: z.object({
    action: z.enum(["findMany", "findUnique"]).describe("Tipo de operação (somente leitura)"),
    model: z.enum(["Service", "Article"]).describe("Nome do modelo/tabela"),
    where: z.object({
      id: z.string().optional(),
      slug: z.string().optional(),
    }).optional().describe("Filtros de busca (id ou slug)"),
  }),
  async *execute({ action, model, where }) {
    try {
      if (!allowedModels[model]) {
        throw new Error(`Acesso ao modelo "${model}" não permitido.`)
      }

      yield {
        state: "querying" as const,
        model,
        action,
        description: allowedModels[model],
      }

      const clientModel = (prisma as any)[model.toLowerCase()]
      if (!clientModel) throw new Error(`Modelo Prisma "${model}" não encontrado.`)

      let result
      switch (action) {
        case "findMany":
          result = await clientModel.findMany({
            where: where || {},
            take: 50, // Limit results to prevent data exfiltration
            select: model === "Service"
              ? { id: true, name: true, description: true, icon: true }
              : { id: true, title: true, slug: true, content: true, createdAt: true },
          })
          break
        case "findUnique":
          if (!where?.id && !where?.slug) {
            throw new Error("Filtro 'id' ou 'slug' é necessário para findUnique")
          }
          result = await clientModel.findUnique({
            where,
            select: model === "Service"
              ? { id: true, name: true, description: true, icon: true }
              : { id: true, title: true, slug: true, content: true, createdAt: true },
          })
          break
        default:
          throw new Error(`Ação ${action} não suportada`)
      }

      yield {
        state: "ready" as const,
        model,
        action,
        result,
        description: allowedModels[model],
        ia_responser: "Aqui está o resultado da sua pesquisa",
      }

      return "Consulta bem sucedida"
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      console.error("[Tool: queryDb] Erro:", message)
      throw new Error(message)
    }
  },
})
