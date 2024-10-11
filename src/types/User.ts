import { StudySet } from "./StudySet";

export interface User {
  id: string;
  name: string | null;
  username: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  studySets: StudySet[];
}
