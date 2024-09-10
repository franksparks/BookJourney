import { db } from "@/db/db";
import { catchErrors } from "@/lib/error-handling";

export const dbGetUsers = catchErrors(async () => {
  return await db.user.findMany({
    orderBy: { id: "asc" }
  });
});

export const dbGetUserByUserId = catchErrors(async (id: string) => {
  return await db.user.findUnique({
    where: { id }
  });
});

export const dbGetUserClerkIdByUserId = catchErrors(async (id: string) => {
  return db.user.findUnique({
    where: { id },
    select: {
      clerkId: true
    }
  });
});

export const dbGetUsersByIds = catchErrors(async (ids: string[]) => {
  const users = await db.user.findMany({
    where: {
      id: {
        in: ids
      }
    }
  });

  return users;
});

export const dbGetUserByClerkId = catchErrors(async (clerkId: string) => {
  return await db.user.findFirst({
    where: { clerkId }
  });
});

export const dbInsertUser = catchErrors(
  async (clerkId: string, email: string) => {
    const user = await dbGetUserByClerkId(clerkId);
    if (user === null) {
      return await db.user.create({
        data: {
          clerkId,
          email
        }
      });
    }
    return console.log("User already exists on database");
  }
);
