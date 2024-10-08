import NextAuth from "next-auth";
import prisma from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [Google],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.username = user.username;
      session.user.studySets = user.studySets;
      return session;
    },
  },
});
