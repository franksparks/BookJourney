"use server";

import { Prisma } from "@prisma/client";
import { dbInsertBook, dbGetBookById, dbGetBooksInList, dbUpdateBook, dbDeleteBook } from "@/db/books";

export const actionInsertBook = async (book: Prisma.BookCreateInput) => {
    const result = await dbInsertBook(book);
    return result;
}

export const actionGetBookById = async (id: string) => {
    const result = await dbGetBookById(id);
    return result;
}

export const actionGetBooksInList = async (listId: string) => {
    const result = await dbGetBooksInList(listId);
    return result;
}

export const actionUpdateBook = async (book: Prisma.BookUpdateInput, id: string) => {
    const result = await dbUpdateBook(book, id);
    return result;
}

export const actionDeleteBook = async (id: string) => {
    const result = await dbDeleteBook(id);
    return result;
}
