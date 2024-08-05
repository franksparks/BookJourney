import { actionDeleteBookStatus } from "@/actions/book-status";

if (process.argv.length != 3) {
  console.error("Usage: bun delete-book-status.ts <status_id>");
  process.exit(1);
}

const [_bun, _script, status_id] = process.argv;

try {
  const result = await actionDeleteBookStatus(status_id);

  if (result != null) {
    console.log("Book status deleted");
    process.exit(0);
  }
} catch (error) {
  console.error("Error deleting book status:", error);
  process.exit(1);
}
