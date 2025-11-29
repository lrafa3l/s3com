'use server';

import { prisma } from "@/lib/prisma";

export const getService = async () => {
  const users = await prisma.service.findMany();
  return users;
};

export const getServiceLeading = async () => {
  const services = await prisma.service.findMany({
    orderBy: {
      createdAt: 'desc', // ordena do mais recente para o mais antigo
    },
    take: 8, // pega apenas os 8 primeiros da lista ordenada
  });

  return services;
};

export const getServiceByID = async (id: string) => {
  const user = await prisma.subscriber.findUnique({
    where: { id }
  });
  return user;
};