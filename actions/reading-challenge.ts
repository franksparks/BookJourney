"use server";

import {
  dbGetReadingChallengeByUserId,
  dbGetReadingChallengeByUserIdAndYear,
  dbInsertReadingChallenge,
  dbMarkChallengeAsCelebrated,
  dbMarkChallengeAsNotCelebrated,
  dbUpdateReadingChallenge,
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

export const actionUpdateChallenge = async (
  challengeId: string,
  goal: number
) => {
  const result = await dbUpdateReadingChallenge(challengeId, goal);
  return result;
};

export const actionMarkChallengeAsCelebrated = async (challengeId: string) => {
  const result = await dbMarkChallengeAsCelebrated(challengeId);
  return result;
};

export const actionMarkChallengeAsNotCelebrated = async (
  challengeId: string
) => {
  const result = await dbMarkChallengeAsNotCelebrated(challengeId);
  return result;
};
