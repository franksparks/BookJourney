import { User } from "./user";

export type ReadingChallenge = {
  id: string;
  goal: number;
  year: number;
  createdAt: Date;
  userId: string;
  user: User;
};
