import { auth } from "@/auth";

const StudySetsPage = async ({ params }: { params: { userId: string } }) => {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-2xl font-semibold">Study Sets</h1>
      <p className="text-gray-500">Create, edit, and delete study sets</p>
    </div>
  );
};

export default StudySetsPage;
