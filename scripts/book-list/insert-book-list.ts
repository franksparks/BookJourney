import { actionInsertBookList } from "@/actions/book-list";
import { Prisma } from "@prisma/client";

if (process.argv.length != 4) {
  console.error("Usage: bun insert-book-list.ts <list_id> <book_id>");
  process.exit(1);
}

const [_bun, _script, list_id, book_id] = process.argv;

const new_book_list: Prisma.BookListCreateInput = {
  list: { connect: { id: list_id } },
  book: { connect: { id: book_id } },
};

const result = await actionInsertBookList(new_book_list);

if (result != null) {
  console.log("BookList entry added:", result);
  process.exit(0);
} else {
  process.exit(1);
}
