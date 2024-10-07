import { Settings as SettingsIcon } from "lucide-react";
import prisma from "@/lib/prisma";

const SettingsButton = async ({ userEmail }: { userEmail: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
    select: {
      id: true,
    },
  });
  console.log(user);

  return (
    <button className="flex gap-4 items-center" type="submit">
      <SettingsIcon className="w-4" />
    </button>
  );
};

export default SettingsButton;
