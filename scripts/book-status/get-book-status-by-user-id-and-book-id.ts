import { actionGetBookStatusByBookIdAndUserId } from "@/actions/book-status";

if (process.argv.length != 4) {
  console.error(
    "Usage: bun get-book-status-by-book-id-and-user-id.ts <book_id> <user_id>"
  );
  process.exit(1);
}

const [_bun, _script, book_id, user_id] = process.argv;

const bookStatus = await actionGetBookStatusByBookIdAndUserId(
  book_id,
  user_id
);

if (bookStatus) {
  console.log(bookStatus);
  process.exit(0);
} else {
  console.log("No book status found");
  process.exit(0);
}
