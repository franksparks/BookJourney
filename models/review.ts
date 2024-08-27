import { Book } from "./book";
import { User } from "./user";

export type Review = {
    id?: string;
    comment: string;
    createdAt?: string;
    book: Book;
    user: User;
  };