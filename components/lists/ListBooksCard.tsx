"use client";

import React, { useState, useEffect, useRef } from "react";
import { List } from "@/models/list";
import { Book } from "@/models/book";
import BookCardAdvanced from "../BookCardAdvanced";
import { ReadStatus } from "@prisma/client";
import { actionGetBookStatusByStatusAndUserId } from "@/actions/book-status";
import { actionGetBookListsByListId } from "@/actions/book-list";

interface BooksListProps {
  list: List | null;
}

export default function ListBooksCard({ list }: BooksListProps) {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = list?.book_count
    ? Math.ceil(list.book_count / pageSize)
    : 0;
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (list) {
      setBooks([]);
      setPage(1);
      setHasMore(true);
      loadBooks(list, 1);
    }
  }, [list]);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const handleScroll = () => {
        if (
          container.scrollTop + container.clientHeight >=
            container.scrollHeight - 100 &&
          !loading &&
          hasMore
        ) {
          loadMoreBooks();
        }
      };

      container.addEventListener("scroll", handleScroll);

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [loading, hasMore]);

  const loadBooks = async (list: List, page: number) => {
    setLoading(true);
    if (Object.values(ReadStatus).includes(list.id as ReadStatus)) {
      const statusBooks = await actionGetBookStatusByStatusAndUserId(
        list.userId,
        list.id as ReadStatus,
        page,
        pageSize
      );
      setBooks((prevBooks) => [
        ...prevBooks,
        ...statusBooks.map((status: any) => status.book),
      ]);
      setHasMore(page < totalPages);
    } else {
      const listBooks = await actionGetBookListsByListId(
        list.id,
        page,
        pageSize
      );
      setBooks((prevBooks) => [
        ...prevBooks,
        ...listBooks.map((list: any) => list.book),
      ]);
      setHasMore(page < totalPages);
    }
    setLoading(false);
  };

  const loadMoreBooks = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    if (list) {
      loadBooks(list, nextPage);
    }
  };

  return (
    <div className="rounded-3xl shadow-xl shadow-sky-200 p-8 bg-orange-500 text-slate-100 h-full flex flex-col">
      <h1 className="font-light text-center border-b-2">
        <strong>{list?.book_count}</strong> Books in <i>{list?.name}</i>
      </h1>
      <div ref={containerRef} className="flex-grow overflow-y-auto">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="mb-2">
              <BookCardAdvanced book={book} />
            </div>
          ))
        ) : (
          <div>No books in this list.</div>
        )}
      </div>
      {loading && <div className="text-center">Loading more books...</div>}
      {!hasMore && (
        <div className="text-center">No more books to load.</div>
      )}
    </div>
  );
}
