import { dbUpdateBook } from "@/db/books";
import { Prisma } from "@prisma/client";

if (process.argv.length < 4 || process.argv.length > 14) {
  console.log(process.argv, process.argv.length)
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
  publishYear,
  language,
  cover,
  ratingAverage
] = process.argv;

const updated_book: Prisma.BookUpdateInput = {
  ...(title && { title }),
  ...(categories && { categories: categories.split(",") }),
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

try {
  const result = await dbUpdateBook(updated_book, book_id);

  if (result != null) {
    console.log("Book updated");
  }
} catch (error) {
  console.error("Error updating book:", error);
  process.exit(1);
}
