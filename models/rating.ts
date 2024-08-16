import { Book } from "./book";
import { User } from "./user";

export const ratingMap: { [key: string]: number } = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5
  };
  
export type Rating = {
  id: string;
  rating: string;
  createdAt: string;
  book: Book;
  user: User;
};


