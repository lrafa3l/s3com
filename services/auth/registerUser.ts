"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

interface Prop {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export async function registerUser({ data }: { data: Prop }) {

  if (!data.name || !data.username || !data.email || !data.password)
    throw new Error("Todos os campos são obrigatórios")

  if (data.password !== data.confirmPassword)
    throw new Error("As senhas não coincidem")

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email: data.email }, { username: data.username }] },
  })

  if (existingUser) throw new Error("Email ou username já cadastrado")

  const hashedPassword = await bcrypt.hash(data.password, 10)

  const user = await prisma.user.create({
    data: {
      name: data.name,
      username: data.username,
      email: data.email,
      password: hashedPassword,
      level: "admin",
    },
  })
  return (user);
}


export async function UpdateUser({ id, formData }: { id: string; formData: FormData }) {
  const name = formData.get("name")?.toString() || "";
  const username = formData.get("username")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const confirmPassword = formData.get("confirmPassword")?.toString() || "";
  const old_password = formData.get("old_password")?.toString() || "";

  if (!name || !username || !email)
    throw new Error("Nome, username e email são obrigatórios");

  const verific = await prisma.user.findUnique({
    where: { id },
  });

  if (!verific) throw new Error("Usuário não encontrado");

  if (!verific.password) {
    throw new Error("Usuário não possui senha local, tente outro método de login");
  }

  const isValid = await bcrypt.compare(old_password, verific.password);
  if (!isValid) throw new Error("Senha antiga incorreta");

  let hashedPassword: string | undefined;
  
  if (password) {
    if (password !== confirmPassword)
      throw new Error("As senhas não coincidem");

    hashedPassword = await bcrypt.hash(password, 10);
  }

  const user = await prisma.user.update({
    where: { id },
    data: {
      name,
      username,
      email,
      ...(hashedPassword && { password: hashedPassword }),
    },
  });

  return user;
}
