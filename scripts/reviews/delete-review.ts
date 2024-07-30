import { dbDeleteReview } from "@/db/reviews";

if (process.argv.length != 3) {
  console.error("Usage: bun delete-review.ts <review-id>");
  process.exit(1);
}

const [_bun, _script, identifier] = process.argv;
try {
  const result = await dbDeleteReview(identifier);
  console.log("Review to delete:", identifier);
  if (result != null) {
    console.log("Review deleted");
  }
} catch (error) {
  console.error("Error deleting review:", error);
  process.exit(1);
}
