'use server';

import { prisma } from "@/lib/prisma";

export const getSubscriber = async () => {
  const users = await prisma.subscriber.findMany();
  return users;
};

export const getSubscriberByID = async (id: string) => {
  const user = await prisma.subscriber.findUnique({
    where: { id }
  });
  return user;
};