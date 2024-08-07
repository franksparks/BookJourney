import { actionDeleteBookList } from "@/actions/book-list";

if (process.argv.length != 3) {
  console.error("Usage: bun delete-book-list.ts <booklist_id>");
  process.exit(1);
}

const [_bun, _script, booklist_id] = process.argv;

const result = await actionDeleteBookList(booklist_id);

if (result != null) {
  console.log("BookList entry deleted:", result);
  process.exit(0);
} else {
  process.exit(1);
}
