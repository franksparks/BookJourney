import { actionUpdateBook } from "@/actions/books";
import { Prisma } from "@prisma/client";

if (process.argv.length < 4 || process.argv.length > 14) {
  console.log(process.argv, process.argv.length);
  console.error(
    "Usage: bun update-book.ts <book_id> [title] [categories] [isbn] [googleBooksId] [description] [pages] [publisher] [publishYear] [language] [cover] [ratingAverage]"
  );
  process.exit(1);
}

const [
  _bun,
  _script,
  book_id,
  title,
  categories,
  isbn,
  googleBooksId,
  description,
  pages,
  publisher,
  language,
  cover,
] = process.argv;

const parsedIsbn = isbn ? Number(isbn) : undefined;

const updated_book: Prisma.BookUpdateInput = {
  ...(title && { title }),
  ...(categories && { categories: categories.split(",") }),
  ...(parsedIsbn && { isbn: parsedIsbn }),
  ...(googleBooksId && { googleBooksId }),
  ...(description && { description }),
  ...(pages && { pages: parseInt(pages) }),
  ...(publisher && { publisher }),
  ...(language && { language }),
  ...(cover && { cover }),
};

const result = await actionUpdateBook(updated_book, book_id);

if (result != null) {
  console.log("Book updated");
  process.exit(0);
} else {
  process.exit(1);
}
