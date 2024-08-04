import { dbGetBookListsByBookIdAndListId } from "@/db/book-list";

if (process.argv.length != 4) {
  console.error(
    "Usage: bun get-book-list-by-list-and-book-id.ts <book_id> <list_id>"
  );
  process.exit(1);
}

const [_bun, _script, book_id, list_id] = process.argv;

try {
  const bookLists = await dbGetBookListsByBookIdAndListId(book_id, list_id);

  if (bookLists.length > 0) {
    console.log("BookLists found:", bookLists);
  } else {
    console.log("No BookLists found for this book and list");
  }
} catch (error) {
  console.error("Error getting BookLists:", error);
  process.exit(1);
}
