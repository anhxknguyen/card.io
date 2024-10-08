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

// Form schema for username update
const updateUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .refine((val) => /^[a-zA-Z0-9]+$/.test(val), {
      // Username must be alphanumeric
      message: "Username must only contain letters and numbers",
    }),
});

type FormType = z.infer<typeof updateUsernameFormSchema>;

// Change username form
const ChangeUsernameForm = () => {
  // Get session data
  const session = useSession();
  const user = session?.data?.user;

  // Toast to display success message
  const { toast } = useToast();

  // Set up form with zod and react-hook-form
  const form = useForm<FormType>({
    resolver: zodResolver(updateUsernameFormSchema),
    defaultValues: {
      username: "",
    },
  });

  // Reset the form to update username when user is found from the session
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
          // Update username on form submit
          onSubmit={form.handleSubmit(async (data) => {
            // API call to update username. Returns true if successful, false if username is already taken.
            const isChangeUsernameSuccessful = await updateUsername(
              data.username
            );

            // Display error message if username is already taken
            if (!isChangeUsernameSuccessful) {
              form.setError("username", {
                message: "Username is already taken",
              });
            } else {
              // Display success message if username is updated
              toast({
                title: `Your username has been updated to "${data.username}"`,
              });
              // Update the session to reflect the new username
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
