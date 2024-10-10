"use client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const MySetsButton = ({ label }: { label?: string }) => {
  const router = useRouter();
  return (
    <Button
      className="w-full m-0 flex justify-center items-center gap-2"
      onClick={() => router.push(`/my-sets`)}
      variant={"default"}
    >
      {label && <span>{label}</span>}
    </Button>
  );
};
