import { actionUpdateChallenge } from "@/actions/reading-challenge";

if (process.argv.length != 4) {
  console.error(
    "Usage: bun update-reading-challenge.ts <reading-challenge-id> <new_goal>"
  );
  process.exit(1);
}

const [_bun, _script, reading_challenge_id, new_goal] = process.argv;

const result = await actionUpdateChallenge(
  reading_challenge_id,
  Number(new_goal)
);

if (result != null) {
  console.log(result);
  process.exit(0);
} else {
  console.log("Reading Challenge could not be updated");
  process.exit(1);
}
