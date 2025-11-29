'use server'

import { prisma } from "@/lib/prisma"

export async function createService(form: FormData) {
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
