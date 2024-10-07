// "use client";
// import prisma from "@/lib/prisma";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// const FormSchema = z.object({
//   username: z
//     .string()
//     .min(3, "Username must be at least 2 characters")
//     .refine(
//       async (username) => {
//         return await isUsernameAvailable(username);
//       },
//       { message: "Username is already taken" }
//     ),
// });

// type FormType = z.infer<typeof FormSchema>;

// async function isUsernameAvailable(username: string) {
//   const user = await prisma.user.findUnique({
//     where: {
//       username,
//     },
//   });
//   return user === null;
// }

// const UserSettings = async ({ params }: { params: { userId: string } }) => {
//   const user = await prisma.user.findUnique({
//     where: {
//       id: params.userId,
//     },
//   });

//   const form = useForm<FormType>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       username: user?.username || "",
//     },
//   });

//   const onSubmit = async (data: FormType) => {
//     await prisma.user.update({
//       where: {
//         id: params.userId,
//       },
//       data: data,
//     });
//   };

//   return (
//     <div className="w-full pt-4">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           <FormField
//             control={form.control}
//             name="username"
//             render={({ field }: { field: any }) => (
//               <FormItem>
//                 <FormLabel>Username</FormLabel>
//                 <FormControl>
//                   <Input placeholder="shadcn" {...field} />
//                 </FormControl>
//                 <FormDescription>
//                   This is your public display name.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button type="submit">Submit</Button>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default UserSettings;
