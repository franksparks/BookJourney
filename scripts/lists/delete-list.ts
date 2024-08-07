import { actionDeleteList } from "@/actions/lists";

if (process.argv.length != 3) {
  console.error("Usage: bun delete-list.ts <list-id>");
  process.exit(1);
}

const [_bun, _script, identifier] = process.argv;

const result = await actionDeleteList(identifier);

if (result != null) {
  console.log(result);
  process.exit(0);
} else {
  process.exit(1);
}
