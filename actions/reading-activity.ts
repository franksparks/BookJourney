"use server";

import {
  dbGetLatestReadingActivityByBookIdAndUserId,
  dbGetReadingActivityByBookIdAndUserId,
  dbGetReadingActivityByUserId,
  dbInsertReadingActivity,
} from "@/db/reading-activity";
import { Prisma } from "@prisma/client";

export const actionInsertReadingActivityPage = async (
  value: string,
  bookId: string,
  userId: string
) => {
  const readingActivity: Prisma.ReadingActivityCreateInput = {
    page: Number(value),

    book: {
      connect: { id: bookId },
    },
    user: {
      connect: { id: userId },
    },
  };
  const result = await dbInsertReadingActivity(readingActivity);
  return result;
};

export const actionInsertReadingActivityPercentage = async (
  value: string,
  bookId: string,
  userId: string
) => {
  const readingActivity: Prisma.ReadingActivityCreateInput = {
    percentage: Number(value),

    book: {
      connect: { id: bookId },
    },
    user: {
      connect: { id: userId },
    },
  };
  const result = await dbInsertReadingActivity(readingActivity);
  return result;
};

export const actionGetReadingActivityByBookIdAndUserId = async (
  bookId: string,
  userId: string
) => {
  const result = await dbGetReadingActivityByBookIdAndUserId(
    bookId,
    userId
  );
  return result;
};

export const actionGetLatestReadingActivityByBookIdAndUserId = async (
  bookId: string,
  userId: string
) => {
  const result = await dbGetLatestReadingActivityByBookIdAndUserId(
    bookId,
    userId
  );
  return result;
};

export const actionGetReadingActivityByUserId = async (userId: string) => {
  const result = await dbGetReadingActivityByUserId(userId);
  return result;
};
