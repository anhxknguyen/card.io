import { auth } from "@/auth";
import {
  Card,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { User } from "../../../../types/User";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { StudySet } from "../../../../types/StudySet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const StudySetsPage = async ({ params }: { params: { userId: string } }) => {
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
          user: true,
          flashcards: true,
        },
      },
    },
  });

  //If sessionUser is not found, redirect to signin page
  if (!sessionUser) {
    redirect("/api/auth/signin?callbackUrl=/my-sets");
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

  const studySets: StudySet[] = urlUser.studySets;
  // await prisma.studySet.create({
  //   data: {
  //     title: "JPNS 101",
  //     user: {
  //       connect: {
  //         id: sessionUser.id,
  //       },
  //     },
  //   },
  // });

  return (
    <div className="w-full flex flex-col gap-5">
      <header>
        <h1 className="text-2xl font-semibold">My Study Sets</h1>
        <p className="text-gray-500">Create, edit, and delete study sets</p>
      </header>
      <div className="grid grid-cols-4 gap-4 ">
        {studySets.map((studySet) => (
          <Card key={studySet.id} className="bg-secondary h-48 relative group">
            <div
              className="absolute top-0 left-0 h-full rounded-l-xl w-2 bg-transparent group-hover:bg-red-500"
              aria-hidden="true"
            ></div>
            <CardHeader>
              <CardTitle className="text-xl">{studySet.title}</CardTitle>
              <CardDescription>
                {studySet.flashcards.length} flashcards
              </CardDescription>
            </CardHeader>
            <CardContent>{""}</CardContent>
            <CardFooter className="flex justify-between">
              <CardDescription className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gray-200 dark:bg-gray-500 dark:text-gray-200">
                    {studySet.user?.username
                      ?.split(" ")
                      .map((name) => name[0]) ||
                      studySet.user?.name?.split(" ").map((name) => name[0])}
                  </AvatarFallback>
                </Avatar>
                {studySet.user.username}
              </CardDescription>
              <CardDescription className="text-sm text-gray-500">
                {new Date(studySet.updatedAt).toLocaleDateString()}
              </CardDescription>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudySetsPage;
