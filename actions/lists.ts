"use server";

import {
  dbDeleteList,
  dbGetListsByUserId,
  dbInsertList,
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

export const actionUpdateList = async (
  list: Prisma.ListUpdateInput,
  id: string
) => {
  const result = await dbUpdateList(list, id);
  return result;
};

export const actionDeleteList = async (id: string) => {
  const result = await dbDeleteList(id);
  return result;
};
