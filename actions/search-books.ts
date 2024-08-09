"use server";

import { searchVolumes } from "@/lib/volumes";

export interface Book {
  title: string;
  authors: string[];
  smallThumbnail?: string;
  description: string;
  genres: string[];
  numPages: number;
}

export async function actionSearchBooks(query: string, index: number, maxResults: number) {
  const result = await searchVolumes(query, index, maxResults);
  const totalItems = result.totalItems;
  const books: Book[] = result.items.map(item => {
    return {
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      smallThumbnail: item.volumeInfo.imageLinks?.smallThumbnail,
      description: item.volumeInfo.description,
      numPages: item.volumeInfo.pages,
      genres: item.volumeInfo.categories
    };
  });
  return { books, totalItems };
}
