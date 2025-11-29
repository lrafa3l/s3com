"use server"

import { prisma } from "@/lib/prisma"
import { sendMail } from "@/util/sendMail"

export async function subscriber(email: string) {
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    throw new Error('E-mail inválido.')
  }

  // Verifica se o e-mail já está cadastrado
  const existing = await prisma.subscriber.findUnique({
    where: { email }
  })

  if (existing) {
    return { message: 'E-mail já inscrito.' }
  }

  // Cria o subscriber
  const subscriber = await prisma.subscriber.create({
    data: { email }
  })

  // Envia e-mail de confirmação
  if (subscriber) {
    await sendMail({
      to: subscriber.email,
      subject: 'Confirmação de inscrição no Sara3com',
      text: `Olá! Você se inscreveu para receber notificações do Sara3com sobre novos serviços, promoções e alertas.`,
      html: `
        <p>Olá!</p>
        <p>Você se inscreveu para receber notificações do <strong>Sara3com</strong> sobre:</p>
        <ul>
          <li>Novos serviços</li>
          <li>Promoções especiais</li>
          <li>Alertas importantes</li>
        </ul>
        <p>Obrigado por se inscrever e ficar por dentro das novidades!</p>
      `
    })
  }

  return { status: true, message: 'Inscrição realizada com sucesso. Você receberá notificações sobre novidades do Sara3com.' }
}

export const deleteSubscriberByID = async (id: string) => {
  return prisma.subscriber.delete({ where: { id } })
}

export const deleteSubscribersByIDs = async (ids: string[]) => {
  if (!ids || ids.length === 0) {
    return {
      success: false,
      deletedCount: 0,
      message: "Nenhum ID fornecido para exclusão",
    }
  }

  try {
    // 🔹 Deleção em lote mais performática (1 query em vez de várias)
    const result = await prisma.subscriber.deleteMany({
      where: { id: { in: ids } },
    })

    return {
      success: true,
      deletedCount: result.count,
      message: `${result.count} assinante(s) deletado(s) com sucesso`,
    }
  } catch (error) {
    console.error("[DeleteSubscribers] Erro ao deletar assinantes:", error)

    return {
      success: false,
      deletedCount: 0,
      message: "Erro ao deletar assinantes",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    }
  }
}
