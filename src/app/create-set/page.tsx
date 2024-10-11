import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CreateStudySetForm } from "@/components/formComponents/CreateStudySetForm";

const CreateStudySet = async () => {
  //Gets user data based on auth session
  const session = await auth();
  const sessionUser = session?.user;

  //If sessionUser is not found, redirect to signin page
  if (!sessionUser) {
    redirect("/api/auth/signin?callbackUrl=/create-set");
  }

  return (
    <div className="w-full px-8 sm:px-0">
      <CreateStudySetForm />
    </div>
  );
};

export default CreateStudySet;
