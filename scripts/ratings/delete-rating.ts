import { dbDeleteRating } from "@/db/rating";

if (process.argv.length != 3) {
  console.error("Usage: bun delete-rating.ts <rating-id>");
  process.exit(1);
}

const [_bun, _script, identifier] = process.argv;
try {
  const result = await dbDeleteRating(identifier);
  console.log("Rating to delete:", identifier);
  if (result != null) {
    console.log("Rating deleted");
  }
} catch (error) {
  console.error("Error deleting rating:", error);
  process.exit(1);
}
