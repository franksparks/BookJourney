"use server";

import { User } from "@/models/user";
import { clerkClient } from "@clerk/nextjs/server";

export async function actionGetUsersClerkInformation( users: User[]) {
  const clerkIds = users.map(user => user.clerkId);
  const client = clerkClient();
  const clerkUsers = await client.users.getUserList({ userId: clerkIds });
  return JSON.parse(JSON.stringify(clerkUsers.data));
}