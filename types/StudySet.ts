import Flashcard from "./Flashcard";

export default interface StudySet {
  id: string;
  title: string;
  flashcards: Flashcard[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
