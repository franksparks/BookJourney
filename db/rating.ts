import { Prisma } from "@prisma/client";
import { db } from "./db";

export const dbInsertRating = async (rating: Prisma.RatingCreateInput) => {
  const result = await db.rating.create({ data: rating });
  return result;
};

export const dbGetRatingsbyBookId = async (bookId: string) => {
  const result = await db.rating.findMany({ where: { bookId } });
  return result;
};

export const dbUpdateRating = async (
  rating: Prisma.RatingUpdateInput,
  id: string
) => {
  const result = await db.rating.update({ where: { id }, data: rating });
  return result;
};

export const dbDeleteRating = async (id: string) => {
  const result = await db.rating.delete({ where: { id } });
  return result;
};
