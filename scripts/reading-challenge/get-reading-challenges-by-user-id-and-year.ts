import { actionGetReadingChallengeByUserIdAndYear } from "@/actions/reading-challenge";

if (process.argv.length != 4) {
  console.error(
    "Usage: bun get-reading-challenge-by-user-id.ts <user-id> <year>"
  );
  process.exit(1);
}

const [_bun, _script, userId, year] = process.argv;

const result = await actionGetReadingChallengeByUserIdAndYear(
  Number(year),
  userId
);

if (result == null) {
  process.exit(1);
} else if (result != null && result.length == 0) {
  console.log("No reading challenges for this User");
  process.exit(0);
} else {
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}
