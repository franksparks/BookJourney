import { actionInsertBook } from "@/actions/books";
import { Prisma } from "@prisma/client";

if (process.argv.length < 3 || process.argv.length > 13) {
  console.error(
    "Usage: bun insert-book.ts <title> <categories> [isbn] [googleBooksId] [description] [pages] [publisher] [publishYear] [language] [cover] [ratingAverage]"
  );
  process.exit(1);
}

const [
  _bun,
  _script,
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

const new_book: Prisma.BookCreateInput = {
  title,
  categories: categories.split(","),
  ...(parsedIsbn && { isbn: parsedIsbn }),
  ...(googleBooksId && { googleBooksId }),
  ...(description && { description }),
  ...(pages && { pages: parseInt(pages) }),
  ...(publisher && { publisher }),
  ...(language && { language }),
  ...(cover && { cover }),
};

const result = await actionInsertBook(new_book);

if (result != null) {
  console.log("Book added", result);
  process.exit(0);
} else {
  process.exit(1);
}
