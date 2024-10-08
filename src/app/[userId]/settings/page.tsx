import ChangeUsernameForm from "@/components/formComponents/ChangeUsernameForm";
import prisma from "@/lib/prisma";
import User from "../../../../types/User";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

const UserSettings = async ({ params }: { params: { userId: string } }) => {
  //Gets user data based on auth session
  const session = await auth();
  const sessionUser = session?.user;

  //Gets user data based on URL
  const urlUser: User | null = await prisma.user.findUnique({
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

  //If sessionUser is not found, redirect to signin page
  if (!sessionUser) {
    redirect("/api/auth/signin?callbackUrl=/settings");
  }

  if (!urlUser) {
    notFound();
  }

  //if sessionUser is not the same as urlUser, return unauthorized
  if (sessionUser?.id !== urlUser?.id) {
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
