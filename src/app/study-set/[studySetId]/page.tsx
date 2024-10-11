import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { StudySet } from "@/types/StudySet";
import { DisplayFlashcards } from "./_DisplayFlashcards";

const StudySetPage = async ({ params }: { params: { studySetId: string } }) => {
  const session = await auth();
  const sessionUser = session?.user;

  // Get the study set data
  const studySet: StudySet | null = await prisma.studySet.findUnique({
    where: {
      id: params.studySetId,
    },
    include: {
      user: true,
      flashcards: true,
    },
  });
  if (!studySet) {
    return <div>Study set not found</div>;
  }

  return <DisplayFlashcards studySet={studySet} />;
};

export default StudySetPage;
