"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUsername } from "../../utils/updateUsername";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .refine((val) => /^[a-zA-Z0-9]+$/.test(val), {
      message: "Username must only contain letters and numbers",
    }),
});

type FormType = z.infer<typeof FormSchema>;

const ChangeUsernameForm = () => {
  const session = useSession();
  const user = session?.data?.user;
  const { toast } = useToast();

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  useEffect(() => {
    if (user?.username) {
      form.reset({
        username: user.username,
      });
    }
  }, [user, form]);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            const isChangeUsernameSuccessful = await updateUsername(
              data.username
            );
            if (!isChangeUsernameSuccessful) {
              form.setError("username", {
                message: "Username is already taken",
              });
            } else {
              toast({
                title: `Your username has been updated to "${data.username}"`,
              });
              session.update();
            }
          })}
          className="space-y-2"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }: { field: any }) => (
              <FormItem className="w-64">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangeUsernameForm;
