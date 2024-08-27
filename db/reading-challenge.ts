import { catchErrors } from "@/lib/error-handling";
import { Prisma } from "@prisma/client";
import { db } from "./db";

export const dbInsertReadingChallenge = catchErrors(
  async (readingChallenge: Prisma.ReadingChallengeCreateInput) => {
    const result = await db.readingChallenge.create({
      data: readingChallenge,
    });

    return result;
  }
);
