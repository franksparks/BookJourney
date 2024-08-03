"use server";

import {
  dbDeleteBookStatus,
  dbGetBookStatusById,
  dbGetBookStatusByBookIdAndUserId,
  dbInsertBookStatus,
  dbUpdateBookStatus,
} from "@/db/book-status";
import { Prisma } from "@prisma/client";

export const actionInsertBookStatus = async (
  bookStatus: Prisma.BookStatusCreateInput
) => {
  const existingStatus = await dbGetBookStatusByBookIdAndUserId(
    bookStatus.book.connect?.id!,
    bookStatus.user.connect?.id!
  );
  if (existingStatus.length == 0) {
    const result = await dbInsertBookStatus(bookStatus);
    return result;
  }
  console.log("This user has already introduced a status for this Book.");
};

export const actionGetBookStatusById = async (id: string) => {
  const result = await dbGetBookStatusById(id);
  return result;
};

export const actionGetBookStatusByBookIdAndUserId = async (
  bookId: string,
  userId: string
) => {
  const result = await dbGetBookStatusByBookIdAndUserId(bookId, userId);
  return result;
};

export const actionUpdateBookStatus = async (
  bookStatus: Prisma.BookStatusUpdateInput,
  id: string
) => {
  const result = await dbUpdateBookStatus(bookStatus, id);
  return result;
};

export const actionDeleteBookStatus = async (id: string) => {
  const result = await dbDeleteBookStatus(id);
  return result;
};
