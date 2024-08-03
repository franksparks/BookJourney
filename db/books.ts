import { Prisma } from "@prisma/client";
import { db } from "./db";
import { defaultErrorHandler } from "@/lib/errors";

export const dbInsertBook = async (book: Prisma.BookCreateInput) => {
  try {
    const result = await db.book.create({ data: book });
    return result;
  } catch (err) {
    defaultErrorHandler(err);
  }
};

export const dbGetBookById = async (id: string) => {
  try {
    const result = await db.book.findUnique({ where: { id } });
    return result;
  } catch (err) {
    defaultErrorHandler(err);
  }
};

export const dbGetBooksInList = async (listId: string) => {
  try {
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
  } catch (err) {
    defaultErrorHandler(err);
  }
};

export const dbUpdateBook = async (
  book: Prisma.BookUpdateInput,
  id: string
) => {
  try {
    const result = await db.book.update({ where: { id }, data: book });
    return result;
  } catch (err) {
    defaultErrorHandler(err);
  }
};

export const dbDeleteBook = async (id: string) => {
  try {
    const result = await db.book.delete({ where: { id } });
    return result;
  } catch (err) {
    defaultErrorHandler(err);
  }
};
