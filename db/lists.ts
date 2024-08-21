import { catchErrors } from "@/lib/error-handling";
import { Prisma } from "@prisma/client";
import { db } from "./db";

export const dbGetListById = catchErrors(async (id: string) => {
  const result = await db.list.findUnique({ where: { id } });
  return result;
});

export const dbInsertList = catchErrors(
  async (list: Prisma.ListCreateInput, userId: string) => {
    const result = await db.list.create({
      data: {
        ...list,
        user: {
          connect: { id: userId },
        },
      },
    });
    return result;
  }
);

export const dbGetListsByUserId = catchErrors(async (userId: string) => {
  const result = await db.list.findMany({
    where: { userId },
    include: {
      books: {
        include: {
          book: true,
        },
      },
    },
  });
  return result;
});

export const dbGetListByNameAndUserId = catchErrors(
  async (name: string, userId: string) => {
    return await db.list.findFirst({
      where: { name, userId },
    });
  }
);

export const dbUpdateList = catchErrors(async (id: string, name: string) => {
  const result = await db.list.update({ where: { id }, data: { name } });
  return result;
});

export const dbDeleteList = catchErrors(async (id: string) => {
  const resultBookLists = await db.bookList.deleteMany({
    where: { listId: id },
  });
  const result = await db.list.delete({ where: { id } });
  return { ...resultBookLists, ...result };
});
