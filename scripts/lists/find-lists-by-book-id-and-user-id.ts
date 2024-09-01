import { actionGetListsByBookIdAndUserId } from "@/actions/lists";

if (process.argv.length != 4) {
  console.error("Usage: bun find-lists-by-user-id.ts <book-id> <user-id>");
  process.exit(1);
}

const [_bun, _script, bookId, userId] = process.argv;

const result = await actionGetListsByBookIdAndUserId(bookId, userId);
if (result == null) {
  process.exit(1);
} else if (result != null && result.length == 0) {
  console.log("Book not added to any list");
  process.exit(0);
} else {
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}
