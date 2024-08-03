import { dbDeleteReview } from "@/db/reviews";

if (process.argv.length != 3) {
  console.error("Usage: bun delete-review.ts <review-id>");
  process.exit(1);
}

const [_bun, _script, identifier] = process.argv;

const result = await dbDeleteReview(identifier);

console.log(result);
