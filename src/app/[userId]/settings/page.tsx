import ChangeUsernameForm from "@/components/formComponents/ChangeUsernameForm";
import prisma from "@/lib/prisma";
import User from "../../../../types/User";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const UserSettings = async ({ params }: { params: { userId: string } }) => {
  const session = await auth();
  const myUser = session?.user;

  const user: User | null = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
    include: {
      studySets: {
        include: {
          flashcards: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/settings");
  }

  if (myUser?.id !== user?.id) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        You are unauthorized to view this page.
      </div>
    );
  }

  return (
    <div className="w-full pt-4">
      <ChangeUsernameForm />
    </div>
  );
};

export default UserSettings;
