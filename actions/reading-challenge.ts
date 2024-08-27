"use server";

import {
  dbGetReadingChallengeByUserId,
  dbGetReadingChallengeByUserIdAndYear,
  dbInsertReadingChallenge,
} from "@/db/reading-challenge";
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

export const actionGetReadingChallengeByUserIdAndYear = async (
  year: number,
  userId: string
) => {
  const result = await dbGetReadingChallengeByUserIdAndYear(year, userId);
  return result;
};

export const actionGetReadingChallengeByUserId = async (userId: string) => {
  const result = await dbGetReadingChallengeByUserId(userId);
  return result;
};
