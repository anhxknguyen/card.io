"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

interface Props {
  data: {
    title: string;
    description: string;
    flashcards: {
      term: string;
      definition: string;
    }[];
  };
  userId: string;
}

export async function createStudySet({ data, userId }: Props) {
  // Get the current session
  const session = await auth();
  const sessionUser = session?.user;

  // Check if the user is the same as the session user
  if (sessionUser?.id !== userId) {
    return false;
  }

  // Check if the title is already taken
  const studySetTitle = await prisma.studySet.findFirst({
    where: {
      title: data.title,
      userId: userId,
    },
  });

  // If the title is already taken, return false
  if (studySetTitle) {
    return false;
  }

  // Create the study set
  await prisma.studySet.create({
    data: {
      title: data.title,
      description: data.description,
      user: {
        connect: {
          id: userId,
        },
      },
      flashcards: {
        create: data.flashcards,
      },
    },
  });

  return true;
}
