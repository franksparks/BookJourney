"use server";

import { checkClerkId, createUser, getOneUser, getUsers } from "@/lib/users";

export async function actionGetUsers() {
  const users = await getUsers();
  return users;
}

export async function actionGetOneUser(id: string) {
  const user = await getOneUser(id);
  return user;
}

export async function actionClerkUser(clerkId: string) {
  const user = await checkClerkId(clerkId);
  return user;
}

export async function actionCreateUser(clerkId: string) {
  const user = await createUser(clerkId);
  return user;
}
