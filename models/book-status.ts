import { ReadStatus } from "@prisma/client";
import { Book } from "./book";

export type BookStatus = {
  id: string;
  status: ReadStatus;
  book: Book;
};
