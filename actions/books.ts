"use server";

import {
  dbDeleteBook,
  dbGetBookById,
  dbGetBooksInList,
  dbInsertBook,
  dbUpdateBook,
  dbUpdateBookRatingAverage,
} from "@/db/books";
import { Prisma } from "@prisma/client";

export const actionInsertBook = async (book: Prisma.BookCreateInput) => {
  const result = await dbInsertBook(book);
  return result;
};

export const actionGetBookById = async (id: string) => {
  const result = await dbGetBookById(id);
  return result;
};

export const actionGetBooksInList = async (listId: string) => {
  const result = await dbGetBooksInList(listId);
  return result;
};

export const actionUpdateBook = async (
  book: Prisma.BookUpdateInput,
  id: string
) => {
  const result = await dbUpdateBook(book, id);
  return result;
};

export const actionUpdateBookRatingAverage = async (
  id: string,
  ratingAverage: number
) => {
  const result = await dbUpdateBookRatingAverage(id, ratingAverage);
  return result;
};

export const actionDeleteBook = async (id: string) => {
  const result = await dbDeleteBook(id);
  return result;
};
