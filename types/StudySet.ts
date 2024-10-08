import { Flashcard } from "./Flashcard";
import { User } from "./User";

export interface StudySet {
  id: string;
  title: string;
  user: {
    id: string;
    name: string | null;
    username: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  flashcards: Flashcard[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
