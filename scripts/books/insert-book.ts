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
  publishYear,
  language,
  cover,
  ratingAverage,
] = process.argv;

const new_book: Prisma.BookCreateInput = {
  title,
  categories: categories.split(","),
  ...(isbn && { isbn }),
  ...(googleBooksId && { googleBooksId }),
  ...(description && { description }),
  ...(pages && { pages: parseInt(pages) }),
  ...(publisher && { publisher }),
  ...(publishYear && { publishYear: parseInt(publishYear) }),
  ...(language && { language }),
  ...(cover && { cover }),
  ...(ratingAverage && { ratingAverage: parseInt(ratingAverage) }),
};

const result = await actionInsertBook(new_book);

if (result != null) {
  console.log("Book added", result);
  process.exit(0);
} else {
  process.exit(1);
}
