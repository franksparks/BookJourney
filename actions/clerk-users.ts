"use server";

import { clerkClient } from "@clerk/nextjs/server";

export async function actionGetUsernameFromClerk(clerkId: string) {
  const client = clerkClient();
  const user = await client.users.getUserList({ userId: [clerkId] });
  const username = user.data[0].username;

  return username;
}

