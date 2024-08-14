import { actionInsertBookStatus } from "@/actions/book-status";
import { ReadStatus } from "@prisma/client";

if (process.argv.length != 5) {
  console.error(
    "Usage: bun insert-book-status.ts <status> <book_id> <user_id>"
  );
  process.exit(1);
}

const [_bun, _script, status, book_id, user_id] = process.argv;

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

const result = await actionInsertBookStatus(
  status as ReadStatus,
  { id: book_id },
  { id: user_id }
);
if (result != null) {
  console.log("Book status added");
  process.exit(0);
} else {
  process.exit(1);
}
