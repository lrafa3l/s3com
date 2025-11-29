'use server';

import { prisma } from "@/lib/prisma";

export const getUsersSetting = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUserByID = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id }
  });
  return user;
};