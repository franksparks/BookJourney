"use server";

import {
  dbGetListById,
  dbDeleteList,
  dbGetListsByBookIdAndUserId,
  dbGetListsByUserId,
  dbInsertList,
  dbUpdateList,
  dbGetListByNameAndUserId,
  dbGetListsBookCountByUserId
} from "@/db/lists";
import { List, Prisma } from "@prisma/client";

export const actionGetListById = async (id: string) => {
  const result = await dbGetListById(id);
  return result;
}
export const actionInsertList = async (list: Prisma.ListCreateInput, userId: string) => {
  const result = await dbInsertList(list, userId);
  return result;
};

export const actionGetListsByUserId = async (id: string) => {
  const result = await dbGetListsByUserId(id);
  return result;
};

export const actionGetListByNameAndUserId = async (
  name: string, userId: string
): Promise<List> => {
  return await dbGetListByNameAndUserId(name, userId);
}

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

export const actionCapitalizeAndReplaceUnderscores = (input: string): string => {
  return input
    .split('_') // Divide la cadena en palabras separadas por guiones bajos
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza la primera letra de cada palabra
    .join(' '); // Une las palabras con un espacio
}
export const actionGetListsBookCountByUserId = async (userId: string) => {
  const result = await dbGetListsBookCountByUserId(userId);
  return result;
}