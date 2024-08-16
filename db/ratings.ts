import { catchErrors } from "@/lib/error-handling";
import { Prisma, RatingValue } from "@prisma/client";
import { db } from "./db";

const ratingMap: { [key: string]: number } = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5
};

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

export const dbGetRatingsByGoogleId = catchErrors(
  async (googleBooksId: string) => {
    const result = await db.rating.findFirst({
      where: {
        book: {
          googleBooksId: googleBooksId
        }
      }
    });
    return result;
  }
);

export const dbGetAverageRatingByBookId = catchErrors(
  async (bookId: string) => {
    const ratings = await db.rating.findMany({
      where: { bookId },
      orderBy: {
        createdAt: "desc"
      },
      take: 20,
      select: {
        rating: true
      }
    });

    const numericRatings = ratings
      .map(r => ratingMap[r.rating])
      .filter(value => value !== undefined);

    const average = numericRatings.length
      ? numericRatings.reduce((sum, value) => sum + value, 0) /
        numericRatings.length
      : 0;

    return average;
  }
);

export const dbGetRatingsByBookIdAndUserId = catchErrors(
  async (bookId: string, userId: string) => {
    const result = await db.rating.findMany({ where: { bookId, userId } });
    return result;
  }
);

export const dbGetRatingByRatingId = catchErrors(async (id: string) => {
  const result = await db.rating.findFirst({ where: { id } });
  return result;
});

export const dbUpdateRating = catchErrors(
  async (rating: RatingValue, id: string) => {
    const result = await db.rating.update({
      where: { id },
      data: { rating }
    });
    return result;
  }
);

export const dbDeleteRating = catchErrors(async (id: string) => {
  const result = await db.rating.delete({ where: { id } });
  return result;
});
