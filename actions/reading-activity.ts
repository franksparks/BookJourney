import {
  dbGetReadingActivityByBookId,
  dbGetReadingActivityByUserId,
  dbInsertReadingActivity,
} from "@/db/reading-activity";
import { Prisma } from "@prisma/client";

export const actionInsertReadingActivity = async (
  readingActivity: Prisma.ReadingActivityCreateInput
) => {
  const result = await dbInsertReadingActivity(readingActivity);
  return result;
};

export const actionGetReadingActivityByBookId = async (bookId: string) => {
  const result = await dbGetReadingActivityByBookId(bookId);
  return result;
};

export const actionGetReadingActivityByUserId = async (userId: string) => {
  const result = await dbGetReadingActivityByUserId(userId);
  return result;
};
