import { catchErrors } from "@/lib/errors";
import { Prisma } from "@prisma/client";
import { db } from "./db";

export const dbInsertRating = catchErrors(
  async (rating: Prisma.RatingCreateInput) => {
    const result = await db.rating.create({ data: rating });
    return result;
  }
);

export const dbGetRatingsByBookId = catchErrors(async (bookId: string) => {
  const result = await db.rating.findMany({ where: { bookId } });
  return result;
});

export const dbGetRatingsByBookIdAndUserId = catchErrors(
  async (bookId: string, userId: string) => {
    const result = await db.rating.findMany({ where: { bookId, userId } });
    return result;
  }
);

export const dbUpdateRating = catchErrors(
  async (rating: Prisma.RatingUpdateInput, id: string) => {
    const result = await db.rating.update({ where: { id }, data: rating });
    return result;
  }
);

export const dbDeleteRating = catchErrors(async (id: string) => {
  const result = await db.rating.delete({ where: { id } });
  return result;
});
