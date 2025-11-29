'use server'

import { prisma } from "@/lib/prisma";

export async function service(form: FormData) {

  const name = form.get("name") as string;
  const description = form.get("description") as string;
  const image = form.get("image") as string | null; 
  const slug = form.get("slug") as string;

  const newService = await prisma.service.create({
    data: {
      name,
      description,
      image,
      slug,
    },
  });

  return newService;
}
