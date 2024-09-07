"use server";

import { clerkClient } from "@clerk/nextjs/server";

export async function actionGetUserClerkInformation(clerkId: string) {
  const client = clerkClient();
  const users = await client.users.getUserList({ userId: [clerkId] });
  return JSON.parse(JSON.stringify(users.data[0]));
}