"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useFieldArray } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { createStudySet } from "@/utils/createStudySet";
import { Trash } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const FlashCardSchema = z.object({
  term: z.string().min(1, "Term is required"),
  definition: z.string().min(1, "Definition is required"),
});

const StudySetFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  flashCards: z
    .array(FlashCardSchema)
    .min(2, "At least two flashcards are required for a study set"),
});

type StudySetFormType = z.infer<typeof StudySetFormSchema>;

export const CreateStudySetForm = () => {
  const session = useSession();
  const user = session?.data?.user;
  const router = useRouter();

  const form = useForm<StudySetFormType>({
    resolver: zodResolver(StudySetFormSchema),
    defaultValues: {
      title: "",
      description: "",
      flashCards: [
        { term: "", definition: "" },
        { term: "", definition: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "flashCards",
    control: form.control,
  });

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-8"
          onSubmit={form.handleSubmit(async (data) => {
            await createStudySet({
              data: {
                ...data,
                flashcards: data.flashCards,
                description: data.description ?? "",
              },
              userId: user?.id ?? "",
            });
            router.push(`/my-sets/${user?.id}`);
          })}
        >
          <div className="flex flex-col md:flex-row gap-10 items-start md:items-center sticky top-0 py-8 bg-[#FFFFFF] dark:bg-[#121212] border-b border-border dark:border-white">
            <Button
              type="button"
              variant={"ghost"}
              onClick={() => {
                window.history.back();
              }}
            >
              <ChevronLeft className="w-6" />
            </Button>
            <div className="flex gap-6">
              <h1 className="text-2xl sm:text-3xl font-bold">
                Create a Study Set
              </h1>
              <Button type="submit">Create</Button>
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }: { field: any }) => (
                <FormItem className="xl:w-1/2">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title of your study set" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }: { field: any }) => (
                <FormItem className="xl:w-1/2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none h-32"
                      placeholder="Description of your study set"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-bold">Flashcards</h1>
            {fields.map((field, index: number) => (
              <div className="flex flex-col gap-5 border border-neutral-300 dark:border-neutral-600 rounded-md bg-neutral-100 dark:bg-neutral-900 p-5">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">{index + 1}</h1>
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    className=""
                    variant={"ghost"}
                  >
                    <Trash className="w-4" />
                  </Button>
                </div>
                <div
                  key={field.id}
                  className="md:flex-row md:flex gap-4 items-end "
                >
                  <FormField
                    control={form.control}
                    name={`flashCards.${index}.term`}
                    render={({ field }: { field: any }) => (
                      <FormItem className="grow flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                          <FormControl>
                            <Textarea
                              className="resize-none"
                              placeholder="Term"
                              {...field}
                            />
                          </FormControl>
                          {
                            // Show error message if there is an error
                            form.formState.errors.flashCards?.[index]?.term ? (
                              <FormMessage />
                            ) : (
                              <p className="text-[0.8rem]">&nbsp;</p>
                            )
                          }
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`flashCards.${index}.definition`}
                    render={({ field }: { field: any }) => (
                      <FormItem className="grow flex flex-col gap-4">
                        <div className="flex gap-2 flex-col">
                          <FormControl>
                            <Textarea
                              className="resize-none"
                              placeholder="Definition"
                              {...field}
                            />
                          </FormControl>

                          {
                            // Show error message if there is an error
                            form.formState.errors.flashCards?.[index]
                              ?.definition ? (
                              <FormMessage />
                            ) : (
                              <p className="text-[0.8rem]">&nbsp;</p>
                            )
                          }
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
            <Button
              variant={"outline"}
              type="button"
              onClick={() => {
                append({ term: "", definition: "" });
              }}
            >
              + Add Flashcard
            </Button>
            {form.formState.errors.flashCards && (
              <div className="text-red-500">
                At least two flashcards are required for a study set
              </div>
            )}
          </div>
          <Button type="submit" className="self-end h-16 w-full sm:w-[400px]">
            Create Study Set
          </Button>
        </form>
      </Form>
    </div>
  );
};
