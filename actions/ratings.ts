"use server";

import {
  dbDeleteRating,
  dbGetRatingsbyBookId,
  dbInsertRating,
  dbUpdateRating,
} from "@/db/rating";
import { Prisma } from "@prisma/client";

export const actionInserRating = async (
  rating: Prisma.RatingCreateInput
) => {
  const result = await dbInsertRating(rating);
  return result;
};

export const actionGetRatingByBook = async (id: string) => {
  const result = await dbGetRatingsbyBookId(id);
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
