import { catchErrors } from "@/lib/errors";
import { Prisma } from "@prisma/client";
import { db } from "./db";

export const dbInsertReview = catchErrors(
  async (review: Prisma.ReviewCreateInput) => {
    const result = await db.review.create({ data: review });
    return result;
  }
);

export const dbGetReviewsByBookId = catchErrors(async (bookId: string) => {
  const result = await db.review.findMany({ where: { bookId } });
  return result;
});

export const dbGetReviewsByBookIdAndUserId = catchErrors(
  async (bookId: string, userId: string) => {
    const result = await db.review.findMany({ where: { bookId, userId } });
    return result;
  }
);

export const dbUpdateReview = catchErrors(
  async (id: string, comment: string) => {
    const result = await db.review.update({
      where: { id },
      data: { comment },
    });
    return result;
  }
);

export const dbDeleteReview = catchErrors(async (id: string) => {
  const result = await db.review.delete({ where: { id } });
  return result;
});
