import { dbInsertList } from "@/db/lists";
import { Prisma } from "@prisma/client";

if (process.argv.length != 4) {
  console.error("Usage: bun insert-list.ts <list_name> <user-id>");
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

const result = await dbInsertList(new_list);

if (result != null) {
  console.log(result);
  process.exit(0);
} else {
  process.exit(1);
}
