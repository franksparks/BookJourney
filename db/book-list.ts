import { catchErrors } from "@/lib/error-handling";
import { Prisma } from "@prisma/client";
import { db } from "./db";

export const dbInsertBookList = catchErrors(
  async (bookList: Prisma.BookListCreateInput) => {
    const result = await db.bookList.create({ data: bookList });
    return result;
  }
);

export const dbGetBookListsByListId = catchErrors(
  async (listId: string) => {
    const result = await db.bookList.findMany({ where: { listId } });
    return result;
  }
);

export const dbGetBookListsByBookIdAndListId = catchErrors(
  async (bookId: string, listId: string) => {
    const result = await db.bookList.findMany({
      where: { bookId, listId },
    });
    return result;
  }
);

export const dbDeleteBookList = catchErrors(async (id: string) => {
  const result = await db.bookList.delete({ where: { id } });
  return result;
});
