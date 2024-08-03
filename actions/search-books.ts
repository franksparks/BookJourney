"use server";

import { searchVolumes } from "@/lib/volumes";

export interface Book {
  title: string;
  authors: string[];
  smallThumbnail?: string;
}

export async function actionSearchBooks(query: string, index: number, maxResults: number, advancedQuery: string = '') {
  const result = await searchVolumes(query, index, maxResults);
  const totalItems = result.totalItems;
  const books: Book[] = result.items.map(item => {
    return {
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      smallThumbnail: item.volumeInfo.imageLinks?.smallThumbnail
    };
  });
  return { books, totalItems };
}
