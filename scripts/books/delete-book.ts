import { actionDeleteBook } from "@/actions/books";

if (process.argv.length != 3) {
  console.error("Usage: bun delete-book.ts <book_id>");
  process.exit(1);
}

const [_bun, _script, book_id] = process.argv;

const result = await actionDeleteBook(book_id);

if (result != null) {
  console.log("Book deleted");
  process.exit(0);
} else {
  console.log("Book cannot be deleted");
  process.exit(1);
}
