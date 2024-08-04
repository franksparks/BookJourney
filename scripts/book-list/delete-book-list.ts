import { dbDeleteBookList } from "@/db/book-list";

if (process.argv.length != 3) {
  console.error("Usage: bun delete-book-list.ts <booklist_id>");
  process.exit(1);
}

const [_bun, _script, booklist_id] = process.argv;

try {
  const result = await dbDeleteBookList(booklist_id);

  if (result != null) {
    console.log("BookList entry deleted:", result);
  }
} catch (error) {
  console.error("Error deleting BookList entry:", error);
  process.exit(1);
}
