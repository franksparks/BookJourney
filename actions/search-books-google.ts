"use server";

import { searchVolumes } from "@/lib/search-volumes";
import { Book } from "@/models/book";

const ISBN10 = 'ISBN_10';
const ISBN13 = 'ISBN_13';

export async function actionSearchBooksGoogle(query: string, index: number, maxResults: number) {
  const result = await searchVolumes(query, index, maxResults);
  const totalItems = result.totalItems;
  const books: Book[] = result.items.map(item => {
    const industryIdentifiers = item.volumeInfo.industryIdentifiers || [];
    const isbn10Identifier = industryIdentifiers.find(identifier => identifier.type === ISBN10);
    const isbn13Identifier = industryIdentifiers.find(identifier => identifier.type === ISBN13);

    return {
      isbn10: isbn10Identifier ? isbn10Identifier.identifier : 0,
      isbn13: isbn13Identifier ? isbn13Identifier.identifier : 0,
      authors: item.volumeInfo.authors,
      googleBooksId: item.id,
      title: item.volumeInfo.title,
      description: item.volumeInfo.description,
      categories: item.volumeInfo.categories,
      pages: item.volumeInfo.pages,
      publisher: item.volumeInfo.publiser,
      publishedDate: item.volumeInfo.publishedDate,
      language: item.volumeInfo.language,
      cover: item.volumeInfo.imageLinks?.smallThumbnail,
    };
  });
  return { books, totalItems };
}
