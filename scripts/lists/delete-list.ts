import { dbDeleteList } from "@/db/lists";

if (process.argv.length != 3) {
  console.error("Usage: bun delete-list.ts <list-id>");
  process.exit(1);
}

const [_bun, _script, identifier] = process.argv;
try {
  const result = await dbDeleteList(identifier);
  console.log("List to delete:", identifier);
  if (result != null) {
    console.log("List deleted");
  }
} catch (error) {
  console.error("Error deleting list:", error);
  process.exit(1);
}
