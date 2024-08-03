import { dbDeleteRating } from "@/db/ratings";

if (process.argv.length != 3) {
  console.error("Usage: bun delete-rating.ts <rating-id>");
  process.exit(1);
}

const [_bun, _script, identifier] = process.argv;

const result = await dbDeleteRating(identifier);

console.log(result);
