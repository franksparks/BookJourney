"use server";

import { dbInsertReadingChallenge } from "@/db/reading-challenge";
import { Prisma } from "@prisma/client";

const year: number = new Date().getFullYear();

export const actionInsertReadingChallenge = async (
  goal: number,
  year: number,
  userId: string
) => {
  const readingChallenge: Prisma.ReadingChallengeCreateInput = {
    goal,
    year,
    user: {
      connect: { id: userId },
    },
  };
  const result = await dbInsertReadingChallenge(readingChallenge);
  return result;
};
