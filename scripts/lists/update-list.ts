import { actionUpdateList } from "@/actions/lists";

if (process.argv.length != 4) {
  console.error("Usage: bun update-list.ts <new_list_name>  <list_id>");
  process.exit(1);
}

const [_bun, _script, list_name, list_id] = process.argv;

const result = await actionUpdateList(list_name, list_id);

if (result != null) {
  console.log(result);
  process.exit(0);
} else {
  process.exit(1);
}
