import { dbGetRatingsByBookIdAndUserId } from "@/db/ratings";

if (process.argv.length != 4) {
  console.error(
    "Usage: bun find-rating-by-book-id-and-user-id.ts <book-id> <user-id>"
  );
  process.exit(1);
}

const [_bun, _script, bookId, userId] = process.argv;

const result = await dbGetRatingsByBookIdAndUserId(bookId, userId);
console.log(
  `Requested ratings of book with id ${bookId} from user with id ${bookId}`
);
if (result != null) {
  console.log(JSON.stringify(result, null, 2));
}
