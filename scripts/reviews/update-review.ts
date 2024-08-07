import { actionUpdateReview } from "@/actions/reviews";

if (process.argv.length != 4) {
  console.error("Usage: bun update-review.ts <review_id> <new_comment>");
  process.exit(1);
}

const [_bun, _script, review_id, new_comment] = process.argv;

const result = await actionUpdateReview(review_id, new_comment);

if (result != null) {
  console.log(result);
  process.exit(0);
} else {
  console.log("Review could not be updated");
  process.exit(1);
}
