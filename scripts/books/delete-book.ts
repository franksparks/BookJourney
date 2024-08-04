import { dbDeleteBook } from "@/db/books";

if (process.argv.length != 3) {
  console.error("Usage: bun delete-book.ts <book_id>");
  process.exit(1);
}

const [_bun, _script, book_id] = process.argv;

try {
  const result = await dbDeleteBook(book_id);

  if (result != null) {
    console.log("Book deleted");
  }
} catch (error) {
  console.error("Error deleting book:", error);
  process.exit(1);
}
