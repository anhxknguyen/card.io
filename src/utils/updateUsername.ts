"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function updateUsername(username: string) {
  // Get the current session
  const session = await auth();
  const sessionUser = session?.user;

  // Check if the username is already taken
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  // If the username is already taken, return false.
  if (user && user.id !== sessionUser?.id) {
    return false;
  } else if (sessionUser?.username === username) {
    // If the username is the same as the current username, return true. (no need to update)
    return true;
  }

  // Update the username
  await prisma.user.update({
    where: {
      id: sessionUser?.id,
    },
    data: { username },
  });

  return true;
}
