import { actionCreateUser, actionGetOneUserByClerkId } from "@/actions/users";

export async function checkUser(id: string) {
  const user = await actionGetOneUserByClerkId(id);
  if (user === null) {
    actionCreateUser(id);
  }
}
