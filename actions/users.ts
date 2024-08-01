"use server";

import {
  dbGetUserByClerkId,
  dbCreateUser,
  dbGetUser,
  dbGetUsers,
} from "@/db/users";

export async function actionGetUsers() {
  const result = await dbGetUsers();
  return result;
}

export async function actionGetUser(id: string) {
  const result = await dbGetUser(id);
  return result;
}

export async function actionGetUserByClerkId(clerkId: string) {
  const result = await dbGetUserByClerkId(clerkId);
  return result;
}

export async function actionCreateUser(clerkId: string) {
  const result = await dbCreateUser(clerkId);
  return result;
}
