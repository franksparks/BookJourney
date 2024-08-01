import { Prisma } from "@prisma/client";
import { db } from "./db";

export const dbInsertBook = async (book: Prisma.BookCreateInput) => {
  const result = await db.book.create({ data: book });
  return result;
};

export const dbGetBookById = async (id: string) => {
  const result = await db.book.findUnique({ where: { id } });
  return result;
};

export const dbGetBooksInList = async (listId: string) => {
  const list = await db.list.findUnique({
    where: { id: listId },
    include: {
      books: {
        include: {
          book: true,
        },
      },
    },
  });

  if (!list) {
    return [];
  }

  const result = list.books.map((bookList) => bookList.book);

  return result;
};

export const dbUpdateBook = async (
  book: Prisma.BookUpdateInput,
  id: string
) => {
  const result = await db.book.update({ where: { id }, data: book });
  return result;
};

export const dbDeleteBook = async (id: string) => {
  const result = await db.book.delete({ where: { id } });
  return result;
};
