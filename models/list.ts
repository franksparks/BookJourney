import { BookList } from "./bookList";

export type List = {
  id: string;
  name: string;
  createdAt: Date;
  userId: string;
  books: BookList[];
};
