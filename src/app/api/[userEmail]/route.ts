import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { userEmail: string } }
) {
  const user = await prisma.user.findUnique({
    where: {
      email: params.userEmail,
    },
  });
  if (!user) {
    return {
      status: 404,
      body: {
        message: "User not found",
      },
    };
  }
  return {
    user,
  };
}
