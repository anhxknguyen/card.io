"use client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

const CreateSetButton = ({
  label,
  variant,
}: {
  label?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}) => {
  const router = useRouter();
  return (
    <Button
      className={`w-fit m-0 flex justify-center items-center gap-2 ${
        variant === "secondary" && "hover:text-primary"
      }`}
      onClick={() => router.push(`/create-set`)}
      variant={variant ? variant : "default"}
    >
      <Plus className="w-4" />
      {label && <span className="hidden sm:block">{label}</span>}
    </Button>
  );
};

export default CreateSetButton;
