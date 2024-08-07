import { actionGetListsByUserId } from "@/actions/lists";

if (process.argv.length != 3) {
  console.error("Usage: bun find-lists-by-user-id.ts <user-id>");
  process.exit(1);
}

const [_bun, _script, identifier] = process.argv;

const result = await actionGetListsByUserId(identifier);
if (result != null && result.length == 0) console.log("User has no lists");
else {
  console.log(JSON.stringify(result, null, 2));
}
