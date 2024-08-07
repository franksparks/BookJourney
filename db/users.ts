import { db } from "@/db/db";

export type User = {
  id: string;
  clerkId: string;
  email: string;
};

export async function dbGetUsers() {
  return await db.user.findMany({
    orderBy: { id: "asc" },
  });
}

export async function dbGetUserByUserId(id: string) {
  return await db.user.findUnique({
    where: { id },
  });
}

export async function dbGetUserByClerkId(clerkId: string) {
  return await db.user.findFirst({
    where: { clerkId },
  });
}

export async function dbInsertUser(clerkId: string, email: string) {
  const user = await dbGetUserByClerkId(clerkId);
  if (user === null) {
    return await db.user.create({
      data: {
        clerkId,
        email,
      },
    });
  }
  return console.log("User already exists on database");
}
