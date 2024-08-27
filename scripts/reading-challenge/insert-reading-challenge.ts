import { actionInsertReadingChallenge } from "@/actions/reading-challenge";

if (process.argv.length != 5) {
  console.error(
    "Usage: bun insert-reading-challenge.ts <goal> <year> <user-id>"
  );
  process.exit(1);
}

const [_bun, _script, goal, year, user_id] = process.argv;

const result = await actionInsertReadingChallenge(
  Number(goal),
  Number(year),
  user_id
);

if (result != null) {
  console.log("Challenge added");
  console.log(result);
  process.exit(0);
} else {
  console.log("Reading Challenge could not be added");
  process.exit(0);
}
