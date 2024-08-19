import { actionInsertReadingActivity } from "@/actions/reading-activity";
import { Prisma } from "@prisma/client";

if (process.argv.length != 5) {
  console.error(
    "Usage: bun insert-reading-activity.ts <value> <book-id> <user-id>"
  );
  process.exit(1);
}

const [_bun, _script, value, book_id, user_id] = process.argv;

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

const new_rating: Prisma.ReadingActivityCreateInput = {
  value: Number(value),
  user: rating_user,
  book: rating_book,
};

const result = await actionInsertReadingActivity(new_rating);

if (result != null) {
  console.log("Activity added");
  console.log(result);
  process.exit(0);
} else {
  console.log("Reading Activity could not be added");
  process.exit(0);
}
