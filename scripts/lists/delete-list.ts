import { dbDeleteList } from "@/db/lists";

if (process.argv.length != 3) {
  console.error("Usage: bun delete-list.ts <list-id>");
  process.exit(1);
}

const [_bun, _script, identifier] = process.argv;

const result = await dbDeleteList(identifier);

console.log(result);
