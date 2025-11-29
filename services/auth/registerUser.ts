"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// 🔹 Função executada no servidor
export async function registerUser(formData: FormData) {

  const name = formData.get("name") as string
  const username = formData.get("username") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!name || !username || !email || !password)
    throw new Error("Todos os campos são obrigatórios")

  if (password !== confirmPassword)
    throw new Error("As senhas não coincidem")

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  })

  if (existingUser) throw new Error("Email ou username já cadastrado")

  const hashedPassword = await bcrypt.hash(password, 10)

  const data = await prisma.user.create({
    data: {
      name,
      username,
      email,
      password: hashedPassword,
      level: "tecnico",
    },
  })
return (data);
}