import { actionUpdateBookStatus } from "@/actions/book-status";
import { Prisma, ReadStatus } from "@prisma/client";

if (process.argv.length != 4) {
  console.error("Usage: bun update-book-status.ts <status_id> <status>");
  process.exit(1);
}

const [_bun, _script, status_id, status] = process.argv;

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

const updated_book_status: Prisma.BookStatusUpdateInput = {
  status: status as ReadStatus,
};

try {
  const result = await actionUpdateBookStatus(updated_book_status, status_id);

  if (result != null) {
    console.log("Book status updated");
  }
} catch (error) {
  console.error("Error updating book status:", error);
  process.exit(1);
}
