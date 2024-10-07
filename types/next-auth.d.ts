import { DefaultSession, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }

  interface User {
    id: string;
    studySets: StudySet[];
  }
}
