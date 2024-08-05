import { catchErrors } from "@/lib/errors";
import { Prisma } from "@prisma/client";
import { db } from "./db";

export const dbInsertList = catchErrors(
  async (list: Prisma.ListCreateInput) => {
    const result = await db.list.create({ data: list });
    return result;
  }
);

export const dbGetListsByUserId = catchErrors(async (userId: string) => {
  const result = await db.list.findMany({ where: { userId } });
  return result;
});

export const dbUpdateList = catchErrors(
  async (list: Prisma.ListUpdateInput, id: string) => {
    const result = await db.list.update({ where: { id }, data: list });
    return result;
  }
);

export const dbDeleteList = catchErrors(async (id: string) => {
  const result = await db.list.delete({ where: { id } });
  return result;
});
