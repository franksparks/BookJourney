"use server";

import {
  dbGetUserByClerkId,
  dbGetUserByUserId,
  dbGetUserClerkIdByUserId,
  dbGetUsersByIds,
  dbGetUsers,
  dbInsertUser,
} from "@/db/users";

export async function actionGetUsers() {
  const result = await dbGetUsers();
  return result;
}

export async function actionGetUserByUserId(id: string) {
  const result = await dbGetUserByUserId(id);
  return result;
}

export async function actionGetUserByClerkId(clerkId: string) {
  const result = await dbGetUserByClerkId(clerkId);
  return result;
}

export async function actionInsertUser(clerkId: string, email: string) {
  const result = await dbInsertUser(clerkId, email);
  return result;
}


export async function actionGetUserClerkIdByUserId(id: string) {
  const result = await dbGetUserClerkIdByUserId(id);
  return result?.clerkId;
}

export async function actionGetUsersByIds (ids: string[]) {
  const result = await dbGetUsersByIds(ids)
  return result
}