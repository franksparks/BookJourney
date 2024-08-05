import { actionUpdateList } from "@/actions/lists";
import { Prisma } from "@prisma/client";

if (process.argv.length != 5) {
  console.error(
    "Usage: bun update-list.ts <new_list_name> <new_user-id> <list_id>"
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

const result = await actionUpdateList(new_list, list_id);

if (result != null) {
  console.log(result);
  process.exit(0);
} else {
  process.exit(1);
}
