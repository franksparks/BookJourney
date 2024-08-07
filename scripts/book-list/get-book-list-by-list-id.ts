import { actionGetBookListsByListId } from "@/actions/book-list";

if (process.argv.length != 3) {
  console.error("Usage: bun get-book-list-by-list-id.ts <list_id>");
  process.exit(1);
}

const [_bun, _script, list_id] = process.argv;

const bookLists = await actionGetBookListsByListId(list_id);

if (bookLists.length > 0) {
  console.log("BookLists found:", bookLists);
  process.exit(0);
} else {
  console.log("No BookLists found for this list");
  process.exit(0);
}
