import { Book } from "./book";

export type BookList = {
  id: string;
  listId: string;
  bookId: Date;
  book: Book;
};
