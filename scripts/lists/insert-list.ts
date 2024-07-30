import { dbInsertList } from "@/db/lists";
import { Prisma } from "@prisma/client";

if (process.argv.length != 4) {
  console.error("Usage: bun insert-lits.ts <list_name> <user-id>");
  process.exit(1);
}

const [_bun, _script, list_name, user_id] = process.argv;

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
  const result = await dbInsertList(new_list);

  if (result != null) {
    console.log("List added");
  }
} catch (error) {
  console.error("Error adding list:", error);
  process.exit(1);
}
