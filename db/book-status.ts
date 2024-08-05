import { Prisma, ReadStatus } from "@prisma/client";
import { db } from "./db";

export const dbInsertBookStatus = async (
  bookStatus: Prisma.BookStatusCreateInput
) => {
  const result = await db.bookStatus.create({ data: bookStatus });
  return result;
};

export const dbGetBookStatusById = async (bookStatusId: string) => {
  const result = await db.bookStatus.findUnique({ where: { id: bookStatusId } });
  return result;
};

export const dbGetBookStatusByBookIdAndUserId = async (
  bookId: string,
  userId: string
) => {
  const result = await db.bookStatus.findMany({ where: { bookId, userId } });
  return result;
};

export const dbGetBooksByUserIdAndReadingStatus = async (
  userId: string,
  status: ReadStatus
) => {
  const result = await db.bookStatus.findMany({
    where: { userId, status },
  });
  return result;
}

export const dbUpdateBookStatus = async (
  bookStatus: Prisma.BookStatusUpdateInput,
  id: string
) => {
  const result = await db.bookStatus.update({
    where: { id },
    data: bookStatus,
  });
  return result;
};

export const dbDeleteBookStatus = async (id: string) => {
  const result = await db.bookStatus.delete({ where: { id } });
  return result;
};
