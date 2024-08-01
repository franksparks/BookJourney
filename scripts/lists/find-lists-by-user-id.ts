import { dbGetListsByUserId } from "@/db/lists";

if (process.argv.length != 3) {
  console.error("Usage: bun find-lists-by-user-id.ts <user-id>");
  process.exit(1);
}

const [_bun, _script, identifier] = process.argv;

const result = await dbGetListsByUserId(identifier);
console.log("Requested lists of user with id:", identifier);
if (result != null) {
  console.log(JSON.stringify(result, null, 2));
}
