import { prisma } from "@/db/db";

export type User = {
  id: string;
  clerkId: string;
  email: string | null;
};

export async function dbGetUsers() {
  return await prisma.user.findMany({
    orderBy: { id: "asc" },
  });
}

export async function dbGetUser(id: string) {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function dbGetUserByClerkId(clerkId: string) {
  return await prisma.user.findUnique({
    where: { clerkId },
  });
}

export async function dbCreateUser(clerkId: string) {
  return await prisma.user.create({
    data: {
      clerkId,
    },
  });
}
