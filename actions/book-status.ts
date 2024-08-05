"use server";

import {
  dbDeleteBookStatus,
  dbGetBookStatusById,
  dbGetBookStatusByBookIdAndUserId,
  dbInsertBookStatus,
  dbUpdateBookStatus,
  dbGetBooksByUserIdAndReadingStatus,
} from "@/db/book-status";
import { Prisma, ReadStatus } from "@prisma/client";

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

export const actionGetBookStatusById = async (bookStatusId: string) => {
  const result = await dbGetBookStatusById(bookStatusId);
  return result;
};

export const actionGetBookStatusByBookIdAndUserId = async (
  bookId: string,
  userId: string
) => {
  const result = await dbGetBookStatusByBookIdAndUserId(bookId, userId);
  return result;
};

export const actionGetBooksByUserIdAndReadingStatus = async (
  userId: string,
  status: ReadStatus
) => {
  const result = await dbGetBooksByUserIdAndReadingStatus(userId, status);
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
