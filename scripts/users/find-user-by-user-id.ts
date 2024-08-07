import { actionGetUserByUserId } from "@/actions/users";

if (process.argv.length != 3) {
  console.error("Usage: bun find-user-by-clerk-id.ts <user-id>");
  process.exit(1);
}

const [_bun, _script, identifier] = process.argv;

const result = await actionGetUserByUserId(identifier);
console.log("Requested user with:", identifier);
if (result != null) {
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}
