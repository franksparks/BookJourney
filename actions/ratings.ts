"use server";

import {
  dbDeleteRating,
  dbGetRatingsByBookId,
  dbGetRatingsByBookIdAndUserId,
  dbInsertRating,
  dbUpdateRating,
} from "@/db/ratings";
import { Prisma } from "@prisma/client";

export const actionInsertRating = async (
  rating: Prisma.RatingCreateInput
) => {
  const existingRating = await dbGetRatingsByBookIdAndUserId(
    rating.book.connect?.id!,
    rating.user.connect?.id!
  );
  if (existingRating.length == 0) {
    const result = await dbInsertRating(rating);
    return result;
  }
  console.log("This user has already introduced a rating for this Book.");
};

export const actionGetRatingByBook = async (id: string) => {
  const result = await dbGetRatingsByBookId(id);
  return result;
};

export const actionUpdateRating = async (
  rating: Prisma.RatingUpdateInput,
  id: string
) => {
  const result = await dbUpdateRating(rating, id);
  return result;
};

export const actionDeleteRating = async (id: string) => {
  const result = await dbDeleteRating(id);
  return result;
};
