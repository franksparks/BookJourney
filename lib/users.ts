import { prisma } from "@/db/db";

export type User = {
  id: string;
  clerkId: string;
  email: string | null;
};

export async function getUsers() {
  return await prisma.user.findMany({
    orderBy: { id: "asc" },
  });
}

export async function getOneUser(id: string) {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function checkClerkId(clerkId: string) {
  return await prisma.user.findUnique({
    where: { clerkId },
  });
}

export async function createUser(clerkId: string) {
  return await prisma.user.create({
    data: {
      clerkId,
    },
  });
}
