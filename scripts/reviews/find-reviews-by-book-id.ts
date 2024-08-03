import { dbGetReviewsByBookId } from "@/db/reviews";

if (process.argv.length != 3) {
  console.error("Usage: bun find-reviews-by-book-id.ts <book-id>");
  process.exit(1);
}

const [_bun, _script, identifier] = process.argv;

const result = await dbGetReviewsByBookId(identifier);

if (result != null && result.length == 0)
  console.log("Book has no reviews");
else {
  console.log(JSON.stringify(result, null, 2));
}
