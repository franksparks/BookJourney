import { catchErrors } from "@/lib/error-handling";
import { Prisma } from "@prisma/client";
import { db } from "./db";
import { Book } from "@/actions/search-books";

export type List = {
  id: string;
  name: string;
  createdAt: Date;
  userId: string;
  books: Book[];
};

export const dbInsertList = catchErrors(
  async (list: Prisma.ListCreateInput) => {
    const result = await db.list.create({ data: list });
    return result;
  }
);

export const dbGetListsByUserId = catchErrors(async (userId: string) => {
  const result = await db.list.findMany({
    where: { userId },
    include: {
      books: true,
    },
  });
  return result;
});

export const dbUpdateList = catchErrors(
  async (id: string, name: string) => {
    const result = await db.list.update({ where: { id }, data: { name } });
    return result;
  }
);

export const dbDeleteList = catchErrors(async (id: string) => {
  const result = await db.list.delete({ where: { id } });
  return result;
});
