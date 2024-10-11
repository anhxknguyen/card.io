import { Flashcard } from "./Flashcard";

export interface StudySet {
  id: string;
  title: string;
  isPublic: boolean;
  description: string | null;
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
  accessedAt: Date | null;
}
