"use server";

import { dbUpdateBookRatingAverage } from "@/db/books";
import {
  dbDeleteRating,
  dbGetAverageRatingByBookId,
  dbGetRatingByRatingId,
  dbGetRatingsByBookId,
  dbGetRatingsByBookIdAndUserId,
  dbInsertRating,
  dbUpdateRating,
} from "@/db/ratings";
import { Prisma, RatingValue } from "@prisma/client";

export const actionInsertRating = async (
  rating: Prisma.RatingCreateInput
) => {
  const existingRating = await dbGetRatingsByBookIdAndUserId(
    rating.book.connect?.id!,
    rating.user.connect?.id!
  );
  if (existingRating.length == 0) {
    const result = await dbInsertRating(rating);
    const average = await dbGetAverageRatingByBookId(
      rating.book.connect?.id
    );
    await dbUpdateBookRatingAverage(rating.book.connect?.id, average);
    return result;
  }
  return console.error(
    "This user has already introduced a rating for this Book."
  );
};

export const actionGetAverageRatingByBookId = async (id: string) => {
  const result = await dbGetAverageRatingByBookId(id);
  return result;
};

export const actionGetRatingsByBook = async (id: string) => {
  const result = await dbGetRatingsByBookId(id);
  return result;
};

export const actionGetRatingByRatingId = async (id: string) => {
  const result = await dbGetRatingByRatingId(id);
  return result;
};

export const actionUpdateRating = async (
  rating: RatingValue,
  id: string
) => {
  await dbUpdateRating(rating, id);
  const { bookId } = await actionGetRatingByRatingId(id);
  const average = await actionGetAverageRatingByBookId(bookId);
  const result = await dbUpdateBookRatingAverage(bookId, average);

  return result;
};

export const actionDeleteRating = async (id: string) => {
  const result = await dbDeleteRating(id);
  return result;
};
