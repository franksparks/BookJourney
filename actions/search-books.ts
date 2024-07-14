"use server";

import { searchVolumes } from "@/lib/volumes";

export interface Book {
    title: string;
    authors: string[];
  }

export async function actionSearchBooks(query: string){
  const result = await searchVolumes(query);

  const books: Book[] = result.items.map((item) => {
    return {
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
      }
  })
  return books;
}