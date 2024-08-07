"use server";

import {
  dbGetUserByClerkId,
  dbGetUserByUserId,
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
