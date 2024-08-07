import { actionUpdateList } from "@/actions/lists";

if (process.argv.length != 4) {
  console.error("Usage: bun update-list.ts <list_id> <new_list_name>");
  process.exit(1);
}

const [_bun, _script, list_id, list_name] = process.argv;

const result = await actionUpdateList(list_id, list_name);

if (result != null) {
  console.log(result);
  process.exit(0);
} else {
  process.exit(1);
}
