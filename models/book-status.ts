import { ReadStatus } from "@prisma/client";
import { Book } from "./book";
import { User } from "./user";

export type BookStatus = {
  id: string;
  status: ReadStatus;
  bookId?: string;
  userId?: string;
  book: Book;
  userId: string;
};
