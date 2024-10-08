import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

const MySetsRedirect = async () => {
  const session = await auth();
  const sessionUser = session?.user;

  if (!sessionUser) {
    redirect("/api/auth/signin?callbackUrl=/my-sets");
  }

  if (sessionUser) {
    redirect(`/my-sets/${sessionUser.id}`);
  }

  notFound();
};

export default MySetsRedirect;
