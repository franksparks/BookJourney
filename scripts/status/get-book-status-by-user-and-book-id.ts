import { dbGetBookStatusByBookIdAndUserId } from "@/db/book-status";

if (process.argv.length != 4) {
  console.error(
    "Usage: bun get-book-status-by-book-id-and-user-id.ts <book_id> <user_id>"
  );
  process.exit(1);
}

const [_bun, _script, book_id, user_id] = process.argv;

try {
  const bookStatuses = await dbGetBookStatusByBookIdAndUserId(book_id, user_id);

  if (bookStatuses.length > 0) {
    console.log("Book statuses found:", bookStatuses);
  } else {
    console.log("No book statuses found");
  }
} catch (error) {
  console.error("Error getting book statuses:", error);
  process.exit(1);
}
