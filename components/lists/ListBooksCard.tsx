"use client";

import React, { useState, useEffect, useRef } from "react";
import { List } from "@/models/list";
import { Book } from "@/models/book";
import BookCardAdvanced from "../BookCardAdvanced";
import { ReadStatus } from "@prisma/client";
import { actionGetBookStatusByStatusAndUserId } from "@/actions/book-status";
import { actionGetBookListsByListId, actionDeleteBookListByBookIdAndListId } from "@/actions/book-list";
import Modal from "../ui/confirmation-modal";
import { usePathname } from "next/navigation";

interface BooksListProps {
  list: List | null;
  lists: List[];
  setLists: (lists: List[]) => void;
  setSelectedList: (list: List | null) => void;
}

export default function ListBooksCard({ list, lists, setLists, setSelectedList }: BooksListProps) {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = list?.book_count
    ? Math.ceil(list.book_count / pageSize)
    : 0;
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

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

  const handleOnDelete = (id: string) => {
    setBookToDelete(id);
    setIsModalOpen(true);
  };
  
  const confirmDelete = async () => {
    if (bookToDelete && list) {
      setSelectedList(null);
      await actionDeleteBookListByBookIdAndListId(bookToDelete, list.id);
      const listIndex = lists.findIndex((l) => l.id === list.id);
      const allLists = lists;
      allLists[listIndex].book_count = (allLists[listIndex].book_count ?? 0) - 1;
      setLists(allLists);
      setSelectedList(allLists[listIndex]);
      setBooks(books.filter((book) => book.id !== bookToDelete));
      setBookToDelete(null);
      setIsModalOpen(false);
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
            <div key={`${book.id}-book`} className="mb-2">
              <BookCardAdvanced book={book} onDelete={() => handleOnDelete(book.id ?? "")} deleteVisible={pathname === "/lists" && !Object.values(ReadStatus).includes(list?.id as ReadStatus)} />
            </div>
          ))
        ) : (
          <div>No books in this list.</div>
        )}
      </div>
      {loading && <div className="text-center">Loading more books...</div>}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => confirmDelete()}
        title="Delete Book"
        message="Are you sure you want to delete this book from list?"
      />
      {!hasMore && (
        <div className="text-center">No more books to load.</div>
      )}
    </div>
  );
}
