import { Prisma } from "@prisma/client";
import { db } from "./db";

export const dbInsertBookList = async (bookList: Prisma.BookListCreateInput) => {
  const result = await db.bookList.create({ data: bookList });
  return result;
};

export const dbGetBookListsByListId = async (listId: string) => {
  const result = await db.bookList.findMany({ where: { listId } });
  return result;
};

export const dbGetBookListsByBookIdAndListId = async (bookId: string, listId: string) => {
  const result = await db.bookList.findMany({ where: { bookId, listId } });
  return result;
};

export const dbDeleteBookList = async (id: string) => {
  const result = await db.bookList.delete({ where: { id } });
  return result;
};
