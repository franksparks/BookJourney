"use server";

import {
  dbDeleteBookList,
  dbGetBookListsByBookIdAndListId,
  dbGetBookListsByListId,
  dbInsertBookList,
} from "@/db/book-list";
import { Prisma } from "@prisma/client";

export const actionInsertBookList = async (
  bookList: Prisma.BookListCreateInput
) => {
  const existingBookList = await dbGetBookListsByBookIdAndListId(
    bookList.book.connect?.id!,
    bookList.list.connect?.id!
  );
  if (existingBookList.length === 0) {
    const result = await dbInsertBookList(bookList);
    return result;
  }
  console.log("This book is already in the list.");
};

export const actionGetBookListsByListId = async (listId: string) => {
  const result = await dbGetBookListsByListId(listId);
  return result;
};

export const actionDeleteBookList = async (id: string) => {
  const result = await dbDeleteBookList(id);
  return result;
};
