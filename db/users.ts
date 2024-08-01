import { db } from "@/db/db";

export type User = {
  id: string;
  clerkId: string;
  email: string | null;
};

export async function dbGetUsers() {
  return await db.user.findMany({
    orderBy: { id: "asc" },
  });
}

export async function dbGetUser(id: string) {
  return await db.user.findUnique({
    where: { id },
  });
}

export async function dbGetUserByClerkId(clerkId: string) {
  return await db.user.findUnique({
    where: { clerkId },
  });
}

export async function dbCreateUser(clerkId: string) {
  return await db.user.create({
    data: {
      clerkId,
    },
  });
}
