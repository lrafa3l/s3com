import { tool } from "ai"
import z from "zod"
import { prisma } from "@/lib/prisma"

const tableDescriptions: Record<string, string> = {
  User: "Tabela de usuários do sistema. Contém dados de login, perfil, permissões e histórico.",
  Permission: "Tabela de permissões que define o que cada usuário pode ou não acessar.",
  Report: "Tabela de relatórios de caixa/turno. Registra abertura, fechamento, valores e vendas associadas.",
  Sales: "Tabela de vendas realizadas. Relaciona usuário, cliente, itens vendidos, métodos de pagamento e total.",
  CartSales: "Itens individuais de uma venda (carrinho de vendas).",
  CardSales: "Itens de vendas feitas em cartões (com título/produto atrelado a um cartão).",
  PayMethod: "Métodos de pagamento usados em uma venda (ex: dinheiro, cartão, pix).",
  Account: "Contas externas vinculadas ao usuário (OAuth, provedores, etc).",
  Session: "Sessões ativas de usuários (login, validade do token).",
  VerificationToken: "Tokens de verificação de email/senha, geralmente temporários.",
  Stock: "Estoque de produtos. Contém nome, categoria, quantidade, validade, preço de compra e fornecedor.",
  CartItem: "Itens do carrinho de uma compra (produtos adquiridos de fornecedores).",
  Purchase: "Compras realizadas junto a fornecedores. Agrupa vários itens do carrinho.",
  Card: "Cartões personalizados de venda (pacotes ou unidades de produto) vinculados ao usuário e ao estoque.",
  Price: "Tabela de preços de venda por quantidade (ex: 1 unid = R$5, 2 unid = R$9).",
  Supplier: "Tabela de fornecedores dos produtos em estoque.",
}

export const queryDbTool = tool({
  description: `Executar consultas no banco de dados PostgreSQL usando Prisma.
  
Modelos disponíveis: ${Object.keys(tableDescriptions).join(", ")}

Use esta ferramenta para buscar, criar ou consultar dados específicos das tabelas.

NOTA: nao apresenta no fim do pront todos os os dados re reportona eu faca isso no meu front-end
`,
  inputSchema: z.object({
    action: z.enum(["findMany", "findUnique", "create"]).describe("Tipo de operação"),
    model: z.string().describe("Nome do modelo/tabela"),
    data: z.any().optional().describe("Dados para a operação (where, create data, etc)"),
  }),
  async *execute({ action, model, data }) {
    try {
      const allowed = Object.keys(tableDescriptions)
      if (!allowed.includes(model)) {
        throw new Error(`Acesso ao modelo "${model}" não permitido.`)
      }

      yield {
        state: "querying" as const,
        model,
        action,
        description: tableDescriptions[model],
      }

      const clientModel = (prisma as any)[model]
      if (!clientModel) throw new Error(`Modelo Prisma "${model}" não encontrado.`)

      let result
      switch (action) {
        case "findMany":
          result = await clientModel.findMany({ where: data || {} })
          break
        case "findUnique":
          result = await clientModel.findUnique({ where: data })
          break
        case "create":
          result = await clientModel.create({ data })
          break
        default:
          throw new Error(`Ação ${action} não suportada`)
      }

      yield {
        state: "ready" as const,
        model,
        action,
        result,
        description: tableDescriptions[model],
        ia_responser: "Tai o resultado da sua pesquisa",
      }

      return "Consulta bem sucedida, de uma olhada nos resultados ao lado"
    } catch (err: any) {
      console.error("[Tool: queryDb] Erro:", err)
      throw new Error(err.message ?? String(err))
    }
  },
})
