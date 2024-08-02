import { dbInsertRating } from "@/db/ratings";
import { Prisma, RatingValue } from "@prisma/client";

if (process.argv.length != 5) {
  console.error(
    "Usage: bun insert-rating.ts <user_id> <book-id> <rating_value>"
  );
  process.exit(1);
}

const isValidRatingValue = (value: string): value is RatingValue => {
  return Object.values(RatingValue).includes(value as RatingValue);
};

const [_bun, _script, user_id, book_id, rating_value] = process.argv;

if (!isValidRatingValue(rating_value)) {
  console.error(
    `Invalid rating value: ${rating_value}. Valid values are: ${Object.values(
      RatingValue
    ).join(", ")}`
  );
  process.exit(1);
}

const rating_user: Prisma.UserCreateNestedOneWithoutListsInput = {
  connect: {
    id: user_id,
  },
};

const rating_book: Prisma.BookCreateNestedOneWithoutListsInput = {
  connect: {
    id: book_id,
  },
};

const new_rating: Prisma.RatingCreateInput = {
  rating: rating_value,
  user: rating_user,
  book: rating_book,
};

try {
  const result = await dbInsertRating(new_rating);

  if (result != null) {
    console.log("Rating added");
  }
} catch (error) {
  console.error("Error adding rating:", error);
  process.exit(1);
}
