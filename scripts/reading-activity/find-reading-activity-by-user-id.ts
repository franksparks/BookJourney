import { actionGetRatingsByBook } from "@/actions/ratings";
import { actionGetReadingActivityByUserId } from "@/actions/reading-activity";

if (process.argv.length != 3) {
  console.error(
    "Usage: bun find-reading-activity-by-user-id.ts <user-id>"
  );
  process.exit(1);
}

const [_bun, _script, identifier] = process.argv;

const result = await actionGetReadingActivityByUserId(identifier);
if (result == null) {
  process.exit(1);
} else if (result != null && result.length == 0) {
  console.log("User has no reading activity");
  process.exit(0);
} else {
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}
