import { actionInsertReview } from "@/actions/reviews";
import { Prisma } from "@prisma/client";

if (process.argv.length != 5) {
  console.error(
    "Usage: bun insert-review.ts <user_id> <book-id> <review_comment>"
  );
  process.exit(1);
}

const [_bun, _script, user_id, book_id, review_comment] = process.argv;

const result = await actionInsertReview(review_comment, user_id, book_id);

if (result != null) {
  console.log(result);
  process.exit(0);
} else {
  console.log("Review could not be added");
  process.exit(1);
}
