"use server";

import {
  dbDeleteReview,
  dbGetReviewsByBookId,
  dbGetReviewsByBookIdAndUserId,
  dbGetReviewsByGoogleBookIdAndUserId,
  dbInsertReview,
  dbUpdateReview,
} from "@/db/reviews";
import { Prisma } from "@prisma/client";

export const actionInsertReviewDeprecated = async (
  review: Prisma.ReviewCreateInput
) => {
  const existingReview = await dbGetReviewsByBookIdAndUserId(
    review.book.connect?.id!,
    review.user.connect?.id!
  );
  if (existingReview!.length == 0) {
    const result = await dbInsertReview(review);
    return result;
  }
  return console.error(
    "This user has already introduced a review for this Book."
  );
};

export const actionInsertReview = async (review: Prisma.ReviewCreateInput) => {
  const result = await dbInsertReview(review);
  return result;
};

export const actionGetReviewByBookId = async (id: string) => {
  const result = await dbGetReviewsByBookId(id);
  return result;
};

export const actionGetReviewByGoogleBookIdAndUserId = async (googleBookId: string, userId: string) => {
  const result = await dbGetReviewsByGoogleBookIdAndUserId(googleBookId, userId)
  return result
};

export const actionUpdateReview = async (id: string, comment: string) => {
  const result = await dbUpdateReview(id, comment);
  return result;
};

export const actionDeleteReview = async (id: string) => {
  const result = await dbDeleteReview(id);
  return result;
};
