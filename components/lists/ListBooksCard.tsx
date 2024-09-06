"use client";

import React, { useState, useEffect } from "react";
import { List } from "@/models/list";
import { Book } from "@/models/book";
import BookCardAdvanced from "../BookCardAdvanced";
import { ReadStatus } from "@prisma/client";
import { actionGetBookStatusByStatusAndUserId } from "@/actions/book-status";
import { actionGetBookListsByListId } from "@/actions/book-list";
import ParametrizedPagination from "../ParametrizedPagination";

interface BooksListProps {
  list: List | null;
}

export default function ListBooksCard({ list }: BooksListProps) {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalBooks, setTotalBooks] = useState(0);

  useEffect(() => {
    if (list) {
      setBooks([]);
      setPage(1);
      loadBooks(list, 1);
    }
  }, [list]);

  useEffect(() => {
    if (list) {
      loadBooks(list, page);
    }
  }, [page]);

  const loadBooks = async (list: List, page: number) => {
    setLoading(true);
    let fetchedBooks: Book[] = [];
    if (Object.values(ReadStatus).includes(list.id as ReadStatus)) {
      const statusBooks = await actionGetBookStatusByStatusAndUserId(
        list.userId,
        list.id as ReadStatus,
        page,
        pageSize
      );
      fetchedBooks = statusBooks.map((status: any) => status.book);
    } else {
      const listBooks = await actionGetBookListsByListId(
        list.id,
        page,
        pageSize
      );
      fetchedBooks = listBooks.map((list: any) => list.book);
    }
    setBooks(fetchedBooks);
    setTotalBooks(list.book_count || 0);
    setLoading(false);
  };

  return (
    <div className="rounded-3xl shadow-xl shadow-sky-200 pt-8 pl-8 pr-8 bg-sky-300 text-slate-100 h-full">
      <h1 className="font-light text-sky-700 text-center pb-2 border-b-4">
        <strong>{list?.book_count}</strong> Books in <i>{list?.name}</i>
      </h1>
      <ul className="space-y-2">
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book.id}>
              <BookCardAdvanced book={book} />
            </li>
          ))
        ) : (
          <li>No books in this list.</li>
        )}
      </ul>
      <div className="pt-8">
        <ParametrizedPagination
          setPage={setPage}
          page={page}
          totalItems={totalBooks}
          numItemsPerPage={pageSize}
        />
        {loading && (
          <div className="text-center">Loading more books...</div>
        )}
      </div>
    </div>
  );
}
