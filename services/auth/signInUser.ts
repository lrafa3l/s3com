"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

export async function signInUser(formData: FormData) {
  const identifier = formData.get("identifier")?.toString() || ""
  const password = formData.get("password")?.toString() || ""

  if (!identifier || !password) {
    return { success: false, message: "Email/Username e senha são obrigatórios" }
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: { equals: identifier, mode: "insensitive" } },
        { username: { equals: identifier, mode: "insensitive" } },
      ],
    },
  })

  if (!user) {
    return { success: false, message: "Usuário não encontrado" }
  }

  if (!user.password) {
    return { success: false, message: "Senha não cadastrada" }
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return { success: false, message: "Senha incorreta" }
  }

  redirect("/dashboard")
}
