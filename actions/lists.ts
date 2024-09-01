"use server";

import {
  dbDeleteList,
  dbGetListsByBookIdAndUserId,
  dbGetListsByUserId,
  dbInsertList,
  dbUpdateBookLists,
  dbUpdateList,
} from "@/db/lists";
import { Prisma } from "@prisma/client";

export const actionInsertList = async (list: Prisma.ListCreateInput) => {
  const result = await dbInsertList(list);
  return result;
};

export const actionGetListsByUserId = async (id: string) => {
  const result = await dbGetListsByUserId(id);
  return result;
};

export const actionGetListsByBookIdAndUserId = async (
  bookId: string,
  userId: string
) => {
  const result = await dbGetListsByBookIdAndUserId(bookId, userId);
  return result;
};

export const actionUpdateList = async (id: string, name: string) => {
  const result = await dbUpdateList(id, name);
  return result;
};

export const actionDeleteList = async (id: string) => {
  const result = await dbDeleteList(id);
  return result;
};
