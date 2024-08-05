import { actionDeleteRating } from "@/actions/ratings";

if (process.argv.length != 3) {
  console.error("Usage: bun delete-rating.ts <rating-id>");
  process.exit(1);
}

const [_bun, _script, identifier] = process.argv;

const result = await actionDeleteRating(identifier);

if (result != null) {
  console.log(result);
  process.exit(0);
} else {
  process.exit(1);
}
