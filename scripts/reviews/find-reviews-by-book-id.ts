import { dbGetReviewsByBookId } from "@/db/reviews";

if (process.argv.length != 3) {
  console.error("Usage: bun find-reviews-by-book-id.ts <book-id>");
  process.exit(1);
}

const [_bun, _script, identifier] = process.argv;

const result = await dbGetReviewsByBookId(identifier);
console.log("Requested reviews of book with id:", identifier);
if (result != null) {
  console.log(JSON.stringify(result, null, 2));
}
