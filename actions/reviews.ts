"use server";

import {
  dbDeleteReview,
  dbGetReviewsByBookId,
  dbInsertReview,
  dbUpdateReview,
} from "@/db/reviews";
import { Prisma } from "@prisma/client";

export const actionInsertReview = async (
  review: Prisma.ReviewCreateInput
) => {
  const result = await dbInsertReview(review);
  return result;
};

export const actionGetReviewByBook = async (id: string) => {
  const result = await dbGetReviewsByBookId(id);
  return result;
};

export const actionUpdateReview = async (
  review: Prisma.ReviewUpdateInput,
  id: string
) => {
  const result = await dbUpdateReview(review, id);
  return result;
};

export const actionDeleteReview = async (id: string) => {
  const result = await dbDeleteReview(id);
  return result;
};
