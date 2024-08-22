import { Book } from "@/models/book";

export function validateProgressInput(
  book: Book,
  progressType: string,
  value: string
): boolean {
  const numberValue = Number(value);

  if (isNaN(numberValue) || numberValue < 0) {
    alert("Please enter a valid number.");
    return false;
  }

  if (
    progressType === "percentage" &&
    (numberValue > 100 || numberValue < 0)
  ) {
    alert("Please enter a valid percentage between 0 and 100.");
    return false;
  }

  if (
    progressType === "pages" &&
    (numberValue > book.pages! || numberValue < 0)
  ) {
    alert("Please enter a valid page.");
    return false;
  }

  return true;
}
