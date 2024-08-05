import { actionGetBooksByUserIdAndReadingStatus } from "@/actions/book-status";
import { ReadStatus } from "@prisma/client";

if (process.argv.length != 4) {
  console.error(
    "Usage: bun get-book-status-by-book-id-and-user-id.ts <user_id> <status>"
  );
  process.exit(1);
}

const [_bun, _script, user_id, status] = process.argv;

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

try {
  const bookStatuses = await actionGetBooksByUserIdAndReadingStatus(
    user_id,
    status as ReadStatus
  );

  if (bookStatuses.length > 0) {
    console.log("Book statuses found:", bookStatuses);
    process.exit(0);
  } else {
    console.log("No book statuses found");
    process.exit(0);
  }
} catch (error) {
  console.error("Error getting book statuses:", error);
  process.exit(1);
}
