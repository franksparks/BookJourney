import { dbUpdateList } from "@/db/lists";
import { Prisma } from "@prisma/client";

if (process.argv.length != 5) {
  console.error(
    "Usage: bun insert-list.ts <new_list_name> <new_user-id> <list_id>"
  );
  process.exit(1);
}

const [_bun, _script, list_name, user_id, list_id] = process.argv;

const list_user: Prisma.UserCreateNestedOneWithoutListsInput = {
  connect: {
    id: user_id,
  },
};

const new_list: Prisma.ListCreateInput = {
  name: list_name,
  user: list_user,
};

try {
  const result = await dbUpdateList(new_list, list_id);

  if (result != null) {
    console.log("List updated");
  }
} catch (error) {
  console.error("Error updating list:", error);
  process.exit(1);
}
