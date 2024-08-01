import { actionCreateUser, actionGetUserByClerkId } from "@/actions/users";

export async function checkUser(id: string) {
  const user = await actionGetUserByClerkId(id);
  if (user === null) {
    actionCreateUser(id);
  }
}
