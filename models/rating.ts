import { Book } from "./book";
import { User } from "./user";

enum RatingValue {
  ONE = "ONE",
  TWO = "TWO",
  THREE = "THREE",
  FOUR = "FOUR",
  FIVE = "FIVE"
}

export const ratingMap: { [key: string]: number } = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5
};

export const inverseRatingMap: { [key: number]: string } = Object.fromEntries(
  Object.entries(ratingMap).map(([key, value]) => [value, key])
);

export type Rating = {
  id?: string;
  rating: RatingValue;
  createdAt?: string;
  book: Book;
  user: User;
};
