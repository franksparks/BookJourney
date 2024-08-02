import { dbGetRatingsbyBookId } from "@/db/ratings";

if (process.argv.length != 3) {
  console.error("Usage: bun find-ratings-by-book-id.ts <book-id>");
  process.exit(1);
}

const [_bun, _script, identifier] = process.argv;

const result = await dbGetRatingsbyBookId(identifier);
console.log("Requested ratings of book with id:", identifier);
if (result != null) {
  console.log(JSON.stringify(result, null, 2));
}
