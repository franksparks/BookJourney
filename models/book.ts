export type Book = {
  id?: string;
  isbn10: number;
  isbn13: number;
  authors: string[];
  googleBooksId: string;
  title: string;
  description: string;
  categories: string[];
  pages: number;
  publisher: string;
  publishedDate: Date;
  language: string;
  cover?: string;
  smallCover?: string;
  ratingAverage?: number;
};
