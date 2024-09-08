import { catchErrors } from "@/lib/error-handling";
import { BookStatus, Prisma, ReadStatus } from "@prisma/client";
import { db } from "./db";

export const dbInsertBookStatus = catchErrors(
  async (bookStatus: Prisma.BookStatusCreateInput) => {
    const result = await db.bookStatus.create({ data: bookStatus });
    return result;
  }
);

export const dbGetBookStatusById = catchErrors(
  async (bookStatusId: string) => {
    const result = await db.bookStatus.findUnique({
      where: { id: bookStatusId },
    });
    return result;
  }
);

export const dbGetBookStatusByUserId = catchErrors(
  async (userId: string) => {
    const result = await db.bookStatus.findMany({
      where: { userId },
      include: { book: true },
    });
    return result;
  }
)

export const dbGetBookStatusCountByUserId = catchErrors(
  async (userId: string) => {
    const result = await db.bookStatus.groupBy({
      by: ["status"],
      _count: {
        status: true
      },
      where: {
        userId
      }
    })
    return result;
  }
)

export const dbGetBookStatusByBookIdAndUserId = catchErrors(
  async (bookId: string, userId: string) => {
    const result = await db.bookStatus.findFirst({
      where: {
        bookId: bookId,
        userId: userId,
      },
    });
    return result;
  }
);

export const dbGetBooksByUserIdAndReadingStatus = catchErrors(
  async (userId: string, status: ReadStatus) => {
    const result = await db.bookStatus.findMany({
      where: { userId, status },
      include: { book: true },
    });
    return result;
  }
);

export const dbGetBookStatusByStatusAndUserId = catchErrors(
  async (userId: string, status: ReadStatus, page: number = 1, pageSize: number = 10) => {
    const result = await db.bookStatus.findMany({
      where: { userId, status },
      include: { book: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return result;
  }
)

export const dbUpdateBookStatus = catchErrors(
  async (id: string, status: ReadStatus) => {
    const result = await db.bookStatus.update({
      where: { id },
      data: { status },
    });
    return result;
  }
);

export const dbDeleteBookStatus = catchErrors(async (id: string) => {
  const result = await db.bookStatus.delete({ where: { id } });
  return result;
});
