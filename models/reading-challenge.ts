import { User } from "./user";

export type ReadingChallenge = {
  id: string;
  goal: number;
  year: number;
  hasCelebrated: boolean;
  createdAt: Date;
  userId: string;
  user: User;
};
