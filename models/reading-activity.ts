import { Book } from "./book";
import { User } from "./user";

export type ReadingActivity = {
  id: string;
  page: number;
  percentage: number;
  createdAt: Date;
  userId: string;
  user: User;
  bookId: string;
  book: Book;
};
