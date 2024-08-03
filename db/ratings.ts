import { Prisma } from "@prisma/client";
import { db } from "./db";
import { defaultErrorHandler } from "@/lib/errors";

export const dbInsertRating = async (rating: Prisma.RatingCreateInput) => {
  try {
    const result = await db.rating.create({ data: rating });
    return result;
  } catch (err) {
    defaultErrorHandler(err);
  }
};

export const dbGetRatingsByBookId = async (bookId: string) => {
  try {
    const result = await db.rating.findMany({ where: { bookId } });
    return result;
  } catch (err) {
    defaultErrorHandler(err);
  }
};

export const dbGetRatingsByBookIdAndUserId = async (
  bookId: string,
  userId: string
) => {
  try {
    const result = await db.rating.findMany({ where: { bookId, userId } });
    return result;
  } catch (err) {
    defaultErrorHandler(err);
  }
};

export const dbUpdateRating = async (
  rating: Prisma.RatingUpdateInput,
  id: string
) => {
  try {
    const result = await db.rating.update({ where: { id }, data: rating });
    return result;
  } catch (err) {
    defaultErrorHandler(err);
  }
};

export const dbDeleteRating = async (id: string) => {
  try {
    const result = await db.rating.delete({ where: { id } });
    return result;
  } catch (err) {
    defaultErrorHandler(err);
  }
};
