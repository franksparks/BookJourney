"use client";

import React, { useState, useEffect } from "react";
import { actionGetBookListsByListId } from "@/actions/book-list";
import { List } from "@/models/list";
import { Book } from "@/models/book";

interface BooksListProps {
  list: List | null;
}

export default function ListBooksCard({ list }: BooksListProps) {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooks();
  }, [list]);

  const fetchBooks = async () => {
    if (!list) return;
    const listBooks = await actionGetBookListsByListId(list.id);
    const allBooks: Book[] = []
    for (const bookList of listBooks) {
        allBooks.push(bookList.book)
    }
    setBooks(allBooks);
  };

  return (
    <div className="p-2 border rounded-lg shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">Books in "{list?.name}"</h2>
      <ul>
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book.id} className="p-2 border-b">
              {book.title} by {book.authors?.join(', ')}
            </li>
          ))
        ) : (
          <li>No books in this list.</li>
        )}
      </ul>
    </div>
  );
}
