"use server";

import { clerkClient } from "@clerk/nextjs/server";

export async function actionGetUserClerkInformation(clerkIds: string[]) {
  const client = clerkClient();
  const users = await client.users.getUserList({ userId: clerkIds });
  return JSON.parse(JSON.stringify(users.data));
}