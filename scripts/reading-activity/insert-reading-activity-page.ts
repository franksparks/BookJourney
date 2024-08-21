import { actionInsertReadingActivityPage } from "@/actions/reading-activity";

if (process.argv.length != 5) {
  console.error(
    "Usage: bun insert-reading-activity-page.ts <page> <book-id> <user-id>"
  );
  process.exit(1);
}

const [_bun, _script, page, book_id, user_id] = process.argv;

const result = await actionInsertReadingActivityPage(
  page,
  book_id,
  user_id
);

if (result != null) {
  console.log("Activity added");
  console.log(result);
  process.exit(0);
} else {
  console.log("Reading Activity could not be added");
  process.exit(0);
}
