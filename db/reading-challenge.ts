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

export const dbGetReadingChallengeByUserIdAndYear = catchErrors(
  async (year: number, userId: string) => {
    const result = await db.readingChallenge.findFirst({
      where: {
        year,
        userId,
      },
    });
    return result;
  }
);

export const dbGetReadingChallengeByUserId = catchErrors(
  async (userId: string) => {
    const result = await db.readingChallenge.findMany({
      where: {
        userId,
      },
    });
    return result;
  }
);

export const dbUpdateReadingChallenge = catchErrors(
  async (id: string, goal: number) => {
    const result = await db.readingChallenge.update({
      where: { id },
      data: { goal },
    });
    return result;
  }
);

export const dbDeleteChallenge = catchErrors(async (id: string) => {
  const result = await db.readingChallenge.delete({
    where: { id },
  });
  return result;
});

export const dbMarkChallengeAsCelebrated = catchErrors(
  async (id: string) => {
    const updatedChallenge = await db.readingChallenge.update({
      where: { id },
      data: { hasCelebrated: true },
    });

    return updatedChallenge;
  }
);

export const dbMarkChallengeAsNotCelebrated = catchErrors(
  async (id: string) => {
    const updatedChallenge = await db.readingChallenge.update({
      where: { id },
      data: { hasCelebrated: false },
    });

    return updatedChallenge;
  }
);
