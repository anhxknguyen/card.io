"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function updateUsername(username: string) {
  const session = await auth();
  const myUser = session?.user;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (user && user.id !== myUser?.id) {
    return false;
  }

  await prisma.user.update({
    where: {
      id: myUser?.id,
    },
    data: { username },
  });

  return true;
}
