import { Book } from "./book";

export type BookList = {
  id: string;
  listId: string;
  bookId: string;
  book: Book;
  userId?: string;
};
