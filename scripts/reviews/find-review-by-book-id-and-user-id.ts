import { dbGetReviewsByBookIdAndUserId } from "@/db/reviews";

if (process.argv.length != 4) {
  console.error(
    "Usage: bun find-review-by-book-id-and-user-id.ts <book-id> <user-id>"
  );
  process.exit(1);
}

const [_bun, _script, bookId, userId] = process.argv;

const result = await dbGetReviewsByBookIdAndUserId(bookId, userId);
console.log(
  `Requested reviews of book with id ${bookId} from user with id ${bookId}`
);
if (result != null) {
  console.log(JSON.stringify(result, null, 2));
}
