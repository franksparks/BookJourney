import { actionGetReadingActivityByBookIdAndUserId } from "@/actions/reading-activity";

if (process.argv.length != 4) {
  console.error(
    "Usage: bun find-reading-activity-by-book-id-and-user-id.ts <book-id> <user-id>"
  );
  process.exit(1);
}

const [_bun, _script, bookId, userId] = process.argv;

const result = await actionGetReadingActivityByBookIdAndUserId(
  bookId,
  userId
);

if (result == null) {
  process.exit(1);
} else if (result != null && result.length == 0) {
  console.log("No reading activity for this Book");
  process.exit(0);
} else {
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}
