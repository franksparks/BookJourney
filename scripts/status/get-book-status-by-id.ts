import { actionGetBookStatusById } from "@/actions/book-status";

if (process.argv.length != 3) {
  console.error("Usage: bun get-book-status-by-id.ts <status_id>");
  process.exit(1);
}

const [_bun, _script, status_id] = process.argv;

try {
  const bookStatus = await actionGetBookStatusById(status_id);

  if (bookStatus != null) {
    console.log("Book status found:", bookStatus);
  } else {
    console.log("Book status not found");
  }
} catch (error) {
  console.error("Error getting book status:", error);
  process.exit(1);
}
