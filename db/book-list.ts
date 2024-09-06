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
  async (listId: string, page: number = 1, pageSize: number = 10) => {
    const result = await db.bookList.findMany({
      where: { listId },
      include: {
        book: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
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

export const dbUpdateBookLists = catchErrors(
  async (bookId: string, listIds: string[]) => {
    await db.bookList.deleteMany({
      where: { bookId: bookId },
    });

    const createBookLists = listIds.map((listId) =>
      db.bookList.create({
        data: {
          bookId: bookId,
          listId: listId,
        },
      })
    );

    const result = await Promise.all(createBookLists);
    return result;
  }
);

export const dbDeleteBookList = catchErrors(async (id: string) => {
  const result = await db.bookList.delete({ where: { id } });
  return result;
});
