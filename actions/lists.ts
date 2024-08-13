"use server";

import {
  dbGetListById,
  dbDeleteList,
  dbGetListsByUserId,
  dbInsertList,
  dbUpdateList,
} from "@/db/lists";
import { List } from "@/models/list";
import { Prisma } from "@prisma/client";

export const actionGetListById = async (id: string) => {
  const result = await dbGetListById(id);
  return result;
}
export const actionInsertList = async (list: Prisma.ListCreateInput, userId: string) => {
  const result = await dbInsertList(list, userId);
  return result;
};

export const actionGetListsByUserId = async (
  id: string
): Promise<List[]> => {
  const result = await dbGetListsByUserId(id);
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
