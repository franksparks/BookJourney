import { defaultErrorHandler } from "@/lib/errors";
import { Prisma } from "@prisma/client";
import { db } from "./db";

export const dbInsertReview = async (review: Prisma.ReviewCreateInput) => {
  try {
    const result = await db.review.create({ data: review });
    return result;
  } catch (err) {
    defaultErrorHandler(err);
  }
};

export const dbGetReviewsByBookId = async (bookId: string) => {
  try {
    const result = await db.review.findMany({ where: { bookId } });
    return result;
  } catch (err) {
    defaultErrorHandler(err);
  }
};

export const dbGetReviewsByBookIdAndUserId = async (
  bookId: string,
  userId: string
) => {
  try {
    const result = await db.review.findMany({ where: { bookId, userId } });
    return result;
  } catch (err) {
    defaultErrorHandler(err);
  }
};

export const dbUpdateReview = async (
  review: Prisma.ReviewUpdateInput,
  id: string
) => {
  try {
    const result = await db.review.update({ where: { id }, data: review });
    return result;
  } catch (err) {
    return defaultErrorHandler(err);
  }
};

export const dbDeleteReview = async (id: string) => {
  try {
    const result = await db.review.delete({ where: { id } });
    return result;
  } catch (err) {
    return defaultErrorHandler(err);
  }
};
