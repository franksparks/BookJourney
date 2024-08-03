import { dbInsertBookStatus } from "@/db/book-status";
import { Prisma, ReadStatus } from "@prisma/client";

if (process.argv.length != 5) {
  console.error(
    "Usage: bun insert-book-status.ts <user_id> <book_id> <status>"
  );
  process.exit(1);
}

const [_bun, _script, user_id, book_id, status] = process.argv;

console.log(process.argv, process.argv.length);

const isValidReadStatus = (value: string): value is ReadStatus => {
  return Object.values(ReadStatus).includes(value as ReadStatus);
};

if (!isValidReadStatus(status)) {
  console.error(
    `Invalid status value: ${status}. Valid values are: ${Object.values(
      ReadStatus
    ).join(", ")}`
  );
  process.exit(1);
}

const user_status: Prisma.UserCreateNestedOneWithoutListsInput = {
  connect: {
    id: user_id,
  },
};
const book_status: Prisma.BookCreateNestedOneWithoutListsInput = {
  connect: {
    id: book_id,
  },
};
const new_book_status: Prisma.BookStatusCreateInput = {
  status: status,
  user: user_status,
  book: book_status,
};

try {
  const result = await dbInsertBookStatus(new_book_status);

  if (result != null) {
    console.log("Book status added");
  }
} catch (error) {
  console.error("Error adding book status:", error);
  process.exit(1);
}
