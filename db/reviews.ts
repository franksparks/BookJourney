import { Prisma } from "@prisma/client";
import { db } from "./db";

export const dbInsertReview = async (review: Prisma.ReviewCreateInput) => {
  const result = await db.review.create({ data: review });
  return result;
};

export const dbGetReviewsByBookId = async (bookId: string) => {
  const result = await db.review.findMany({ where: { bookId } });
  return result;
};

export const dbGetReviewsByBookIdAndUserId = async (
  bookId: string,
  userId: string
) => {
  const result = await db.review.findMany({ where: { bookId, userId } });
  return result;
};

export const dbUpdateReview = async (
  review: Prisma.ReviewUpdateInput,
  id: string
) => {
  const result = await db.review.update({ where: { id }, data: review });
  return result;
};

export const dbDeleteReview = async (id: string) => {
  const result = await db.review.delete({ where: { id } });
  return result;
};
