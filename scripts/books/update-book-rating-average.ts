import { actionUpdateBookRatingAverage } from "@/actions/books";

if (process.argv.length != 4) {
  console.log(process.argv, process.argv.length);
  console.error("Usage: bun update-book.ts <book_id> [ratingAverage]");
  process.exit(1);
}

const [_bun, _script, book_id, ratingAverage] = process.argv;

try {
  const rating = Number(ratingAverage);
  if (isNaN(rating)) {
    console.error("Error: ratingAverage must be a valid number.");
    process.exit(1);
  }

  const result = await actionUpdateBookRatingAverage(book_id, rating);

  if (result != null) {
    console.log("Book updated");
    process.exit(0);
  }
} catch (error) {
  console.error("Error updating book:", error);
  process.exit(1);
}
