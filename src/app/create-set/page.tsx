import { auth } from "@/auth";
import { redirect } from "next/navigation";

const CreateStudySet = async () => {
  //Gets user data based on auth session
  const session = await auth();
  const sessionUser = session?.user;

  //If sessionUser is not found, redirect to signin page
  if (!sessionUser) {
    redirect("/api/auth/signin?callbackUrl=/my-sets");
  }

  return <div className="w-full px-8 sm:px-0">CreateStudySet</div>;
};

export default CreateStudySet;
