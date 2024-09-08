import { ReadStatus } from "@prisma/client";
import { Book } from "./book";
import { User } from "./user";

export type BookStatus = {
  id: string;
  status: ReadStatus;
  book: Book;
  userId: string;
};
