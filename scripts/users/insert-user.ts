import { actionInsertUser } from "@/actions/users";

if (process.argv.length != 4) {
  console.error("Usage: bun insert-user.ts <clerk_id> <email>");
  process.exit(1);
}

const [_bun, _script, clerk_id, email] = process.argv;

try {
  const result = await actionInsertUser(clerk_id, email);

  if (result != null) {
    console.log("User added");
  }
} catch (error) {
  console.error("Error adding review:", error);
  process.exit(1);
}
