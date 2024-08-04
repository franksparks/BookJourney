import { dbGetBookListsByListId } from "@/db/book-list";

if (process.argv.length != 3) {
  console.error("Usage: bun get-book-list-by-list-id.ts <list_id>");
  process.exit(1);
}

const [_bun, _script, list_id] = process.argv;

try {
  const bookLists = await dbGetBookListsByListId(list_id);

  if (bookLists.length > 0) {
    console.log("BookLists found:", bookLists);
  } else {
    console.log("No BookLists found for this list");
  }
} catch (error) {
  console.error("Error getting BookLists:", error);
  process.exit(1);
}
