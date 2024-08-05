import { actionGetRatingsByBook } from "@/actions/ratings";

if (process.argv.length != 3) {
  console.error("Usage: bun find-ratings-by-book-id.ts <book-id>");
  process.exit(1);
}

const [_bun, _script, identifier] = process.argv;

const result = await actionGetRatingsByBook(identifier);

if (result != null && result.length == 0)
  console.log("Book has no ratings");
else {
  console.log(JSON.stringify(result, null, 2));
}
