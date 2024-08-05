import { dbGetBooksInList } from "@/db/books";

if (process.argv.length != 3) {
  console.error("Usage: bun get-books-in-list.ts <list_id>");
  process.exit(1);
}

const [_bun, _script, list_id] = process.argv;

try {
  const books = await dbGetBooksInList(list_id);

  if (books.length > 0) {
    console.log("Books in list:", books);
  } else {
    console.log("No books found in list");
  }
} catch (error) {
  console.error("Error getting books in list:", error);
  process.exit(1);
}
