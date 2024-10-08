import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

const SettingsRedirect = async () => {
  const session = await auth();
  const sessionUser = session?.user;

  if (!sessionUser) {
    redirect("/api/auth/signin?callbackUrl=/settings");
  }

  if (sessionUser) {
    redirect(`/settings/${sessionUser.id}`);
  }

  notFound();
};

export default SettingsRedirect;
