import { dbGetBookById } from "@/db/books";

if (process.argv.length != 3) {
  console.error("Usage: bun get-book-by-id.ts <book_id>");
  process.exit(1);
}

const [_bun, _script, book_id] = process.argv;

try {
  const book = await dbGetBookById(book_id);

  if (book != null) {
    console.log("Book found:", book);
  } else {
    console.log("Book not found");
  }
} catch (error) {
  console.error("Error getting book:", error);
  process.exit(1);
}
