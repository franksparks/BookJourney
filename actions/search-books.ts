"use server";

import { searchVolumes } from "@/lib/volumes";

export interface Book {
    title: string;
    authors: string[];
  }

export async function actionSearchBooks(query: string, index: number){
  const result = await searchVolumes(query, index);

  const books: Book[] = result.items.map((item) => {
    return {
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
      }
  })
  return books;
}