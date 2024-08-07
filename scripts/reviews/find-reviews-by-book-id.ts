import { actionGetReviewByBookId } from "@/actions/reviews";

if (process.argv.length != 3) {
  console.error("Usage: bun find-reviews-by-book-id.ts <book-id>");
  process.exit(1);
}

const [_bun, _script, identifier] = process.argv;

const result = await actionGetReviewByBookId(identifier);

if (result == null) {
  process.exit(1);
} else if (result != null && result.length == 0) {
  console.log("Book has no reviews");
  process.exit(0);
} else {
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}
