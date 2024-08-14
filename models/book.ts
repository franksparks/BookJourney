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
  ratingAverage?: number;
};
