import { actionGetUsers } from "@/actions/users";

if (process.argv.length != 2) {
  console.error("Usage: bun find-users.ts");
  process.exit(1);
}

const [_bun, _script] = process.argv;

const result = await actionGetUsers();

if (result != null) {
  console.log(JSON.stringify(result, null, 2));
}
