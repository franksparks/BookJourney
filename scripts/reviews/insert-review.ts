import { actionInsertReview } from "@/actions/reviews";
import { Prisma } from "@prisma/client";

if (process.argv.length != 5) {
  console.error(
    "Usage: bun insert-review.ts <user_id> <book-id> <review_comment>"
  );
  process.exit(1);
}

const [_bun, _script, user_id, book_id, review_comment] = process.argv;

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

const new_review: Prisma.ReviewCreateInput = {
  comment: review_comment,
  user: rating_user,
  book: rating_book,
};

const result = await actionInsertReview(new_review);

if (result != null) {
  console.log(result);
  process.exit(0);
} else {
  console.log("Review could not be added");
  process.exit(1);
}
