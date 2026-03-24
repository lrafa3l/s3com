'use server'

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error("Não autorizado: faça login para continuar")
  }
  if (session.user?.level !== "admin") {
    throw new Error("Não autorizado: permissão de administrador necessária")
  }
  return session
}

export async function createService(form: FormData) {
  await requireAdmin()

  const name = form.get("name") as string
  const description = form.get("description") as string
  const icon = form.get("icon") as string | null

  const newService = await prisma.service.create({
    data: {
      name,
      description,
      icon,
    },
  })

  return newService
}

export async function updateService(id: string, form: FormData) {
  await requireAdmin()

  const name = form.get("name") as string
  const description = form.get("description") as string
  const icon = form.get("icon") as string | null

  const updatedService = await prisma.service.update({
    where: { id },
    data: {
      name,
      description,
      icon,
    },
  })

  return updatedService
}

export async function deleteService(id: string) {
  await requireAdmin()

  const deletedService = await prisma.service.delete({
    where: { id },
  })

  return deletedService
}

export async function getService(id: string) {
  const service = await prisma.service.findUnique({
    where: { id },
  })

  return service
}
