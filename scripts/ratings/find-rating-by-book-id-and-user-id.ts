import { dbGetRatingsByBookIdAndUserId } from "@/db/ratings";

if (process.argv.length != 4) {
  console.error(
    "Usage: bun find-rating-by-book-id-and-user-id.ts <book-id> <user-id>"
  );
  process.exit(1);
}

const [_bun, _script, bookId, userId] = process.argv;

const result = await dbGetRatingsByBookIdAndUserId(bookId, userId);

if (result != null && result.length == 0)
  console.log("User left no rating for this Book");
else {
  console.log(JSON.stringify(result, null, 2));
}
