import { catchErrors } from "@/lib/error-handling";
import { Prisma } from "@prisma/client";
import { db } from "./db";

export const dbInsertReadingActivity = catchErrors(
  async (readingActivity: Prisma.ReadingActivityCreateInput) => {
    const result = await db.readingActivity.create({
      data: readingActivity,
    });
    return result;
  }
);

export const dbGetReadingActivityByBookIdandUserId = catchErrors(
  async (bookId: string, userId: string) => {
    const result = await db.readingActivity.findMany({
      where: { bookId, userId },
    });
    return result;
  }
);

export const dbGetReadingActivityByUserId = catchErrors(
  async (userId: string) => {
    const result = await db.readingActivity.findMany({
      where: { userId },
      include: {
        book: true,
      },
    });
    return result;
  }
);
