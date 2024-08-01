"use server";

import {
  dbGetUserByClerkId,
  dbCreateUser,
  dbGetUser,
  dbGetUsers,
} from "@/db/users";

export async function actionGetUsers() {
  const users = await dbGetUsers();
  return users;
}

export async function actionGetUser(id: string) {
  const user = await dbGetUser(id);
  return user;
}

export async function actionGetOneUserByClerkId(clerkId: string) {
  const user = await dbGetUserByClerkId(clerkId);
  return user;
}

export async function actionCreateUser(clerkId: string) {
  const user = await dbCreateUser(clerkId);
  return user;
}
