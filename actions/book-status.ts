"use server";

import {
  dbDeleteBookStatus,
  dbGetBooksByUserIdAndReadingStatus,
  dbGetBookStatusByBookIdAndUserId,
  dbGetBookStatusById,
  dbInsertBookStatus,
  dbUpdateBookStatus,
} from "@/db/book-status";
import { Prisma, ReadStatus } from "@prisma/client";

export const actionInsertBookStatus = async (
  status: ReadStatus,
  book: { id: string },
  user: { id: string }
) => {
  const existingStatus = await dbGetBookStatusByBookIdAndUserId(
    book.id,
    user.id
  );

  if (!existingStatus || existingStatus.length === 0) {
    const bookStatus: Prisma.BookStatusCreateInput = {
      status: status,
      user: {
        connect: { id: user.id },
      },
      book: {
        connect: { id: book.id },
      },
    };
    const result = await dbInsertBookStatus(bookStatus);
    return result;
  } else {
    console.log(
      "This user has already introduced a status for this Book."
    );
  }
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
  id: string,
  bookStatus: ReadStatus
) => {
  const result = await dbUpdateBookStatus(id, bookStatus);
  return result;
};

export const actionDeleteBookStatus = async (id: string) => {
  const result = await dbDeleteBookStatus(id);
  return result;
};
