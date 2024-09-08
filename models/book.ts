import { BookList } from "./book-list";
import { BookStatus } from "./book-status";
import { Rating } from "./rating";
import { ReadingActivity } from "./reading-activity";
import { Review } from "./review";

export type Book = {
  id?: string;
  isbn10: string;
  isbn13: string;
  authors: string[];
  googleBooksId: string;
  title: string;
  description: string;
  categories: string[];
  pages: number;
  publisher: string;
  publishedDate: string;
  language: string;
  cover?: string;
  smallCover?: string;
  ratingAverage?: number;
};

export type DbBook = Book & {
  reviews: Review[]
  ratings: Rating[]
  lists: BookList[]
  bookStatuses: BookStatus[]
  readingActivity: ReadingActivity[]
};