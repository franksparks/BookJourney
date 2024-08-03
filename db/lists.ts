import { Prisma } from "@prisma/client";
import { db } from "./db";
import { defaultErrorHandler } from "@/lib/errors";

export const dbInsertList = async (list: Prisma.ListCreateInput) => {
  try {
    const result = await db.list.create({ data: list });
    return result;
  } catch (err) {
    defaultErrorHandler(err);
    console.log("List could no be added");
  }
};

export const dbGetListsByUserId = async (userId: string) => {
  try {
    const result = await db.list.findMany({ where: { userId } });
    return result;
  } catch (err) {
    defaultErrorHandler(err);
  }
};

export const dbUpdateList = async (
  list: Prisma.ListUpdateInput,
  id: string
) => {
  try {
    const result = await db.list.update({ where: { id }, data: list });
    return result;
  } catch (err) {
    defaultErrorHandler(err);
  }
};

export const dbDeleteList = async (id: string) => {
  try {
    const result = await db.list.delete({ where: { id } });
    return result;
  } catch (err) {
    defaultErrorHandler(err);
  }
};
