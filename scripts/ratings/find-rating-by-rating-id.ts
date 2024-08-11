import { actionGetRatingByRatingId } from "@/actions/ratings";

if (process.argv.length != 3) {
  console.error("Usage: bun find-ratings-by-rating-id.ts <rating-id>");
  process.exit(1);
}

const [_bun, _script, identifier] = process.argv;

const result = await actionGetRatingByRatingId(identifier);
if (result == null) {
  process.exit(1);
} else {
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}
