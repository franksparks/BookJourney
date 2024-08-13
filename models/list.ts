import { BookList } from "./book-list";

export type List = {
  id: string;
  name: string;
  createdAt: Date;
  userId: string;
  books: BookList[];
  bookCount: number;
};
