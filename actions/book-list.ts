"use server";

import {
  dbDeleteBookList,
  dbDeleteBookListsByBookIdAndListId,
  dbGetBookListsByBookIdAndListId,
  dbGetBooksByListId,
  dbInsertBookList,
  dbUpdateBookLists,
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
  return console.log("This book is already in the list.");
};

export const actionGetBooksByListId = async (listId: string, page = 1, pageSize = 10) => {
  const result = await dbGetBooksByListId(listId, page, pageSize);
  return result;
};

export const actionUpdateBookLists = async (
  bookId: string,
  listIds: string[]
) => {
  const result = await dbUpdateBookLists(bookId, listIds);
  return result;
};

export const actionDeleteBookList = async (id: string) => {
  const result = await dbDeleteBookList(id);
  return result;
};

export const actionDeleteBookListByBookIdAndListId = async (bookId: string, listId: string) => {
  const result = await dbDeleteBookListsByBookIdAndListId(bookId, listId);
  return result;
}