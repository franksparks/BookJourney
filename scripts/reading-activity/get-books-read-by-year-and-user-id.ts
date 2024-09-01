import {
  actionGetBooksReadByUserIdAndYear,
  actionGetLatestReadingActivityByBookIdAndUserId,
} from "@/actions/reading-activity";

if (process.argv.length != 4) {
  console.error(
    "Usage: bun get-books-read-by-user-id-and-year.ts <user-id> <year>"
  );
  process.exit(1);
}

const [_bun, _script, userId, year] = process.argv;

const result = await actionGetBooksReadByUserIdAndYear(userId, Number(year));

if (result == null) {
  process.exit(1);
} else if (result != null && result.length == 0) {
  console.log("No books read on this year");
  process.exit(0);
} else {
  console.log(JSON.stringify(result, null, 2));
  console.log(result.length);
  process.exit(0);
}
