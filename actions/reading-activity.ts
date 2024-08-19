import {
  dbGetReadingActivityByBookIdandUserId,
  dbGetReadingActivityByUserId,
  dbInsertReadingActivity,
} from "@/db/reading-activity";
import { Prisma } from "@prisma/client";

export const actionInsertReadingActivity = async (
  value: string,
  bookId: string,
  userId: string
) => {
  const readingActivity: Prisma.ReadingActivityCreateInput = {
    value: Number(value),

    book: {
      connect: { id: bookId },
    },
    user: {
      connect: { id: userId },
    },
  };
  console.log(readingActivity);
  const result = await dbInsertReadingActivity(readingActivity);
  console.log(result);
  return result;
};

export const actionGetReadingActivityByBookIdAndId = async (
  bookId: string
) => {
  const result = await dbGetReadingActivityByBookIdandUserId(bookId);
  return result;
};

export const actionGetReadingActivityByUserId = async (userId: string) => {
  const result = await dbGetReadingActivityByUserId(userId);
  return result;
};
