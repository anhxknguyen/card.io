export default interface Flashcard {
  id: string;
  term: string;
  definition: string;
  studySetId: string;
  createdAt: Date;
  updatedAt: Date;
}
