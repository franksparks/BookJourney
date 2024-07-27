"use server";

import { getOneUser, getUsers } from "@/lib/users";

export async function actionGetUsers() {
  const users = await getUsers();
  return users;
}

export async function actionGetOneUser(id: string) {
  const user = await getOneUser(id);
  return user;
}
