import { actionDeleteReview } from "@/actions/reviews";

if (process.argv.length != 3) {
  console.error("Usage: bun delete-review.ts <review-id>");
  process.exit(1);
}

const [_bun, _script, identifier] = process.argv;

const result = await actionDeleteReview(identifier);

if (result != null) {
  console.log(result);
  process.exit(0);
} else {
  process.exit(1);
}
