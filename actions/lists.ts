"use server";

import {
  dbDeleteList,
  dbGetListsByUserId,
  dbInsertList,
  dbUpdateList,
  List,
} from "@/db/lists";
import { Prisma } from "@prisma/client";

export const actionInsertList = async (list: Prisma.ListCreateInput) => {
  const result = await dbInsertList(list);
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
