import { dbUpdateReview } from "@/db/reviews";
import { Prisma } from "@prisma/client";

if (process.argv.length != 6) {
  console.error(
    "Usage: bun update-review.ts <user_id> <book-id> <new_comment> <review_id>"
  );
  process.exit(1);
}

const [_bun, _script, user_id, book_id, new_comment, review_id] =
  process.argv;

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
  comment: new_comment,
  user: rating_user,
  book: rating_book,
};

const result = await dbUpdateReview(new_review, review_id);

console.log(result);
