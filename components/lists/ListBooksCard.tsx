"use client";

import React, { useState, useEffect } from "react";
import { actionGetBookListsByListId } from "@/actions/book-list";

interface BooksListProps {
  listId: string | null;
}

export default function ListBooksCard({ listId }: BooksListProps) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, [listId]);

  const fetchBooks = async () => {
    if (!listId) return;
    const result = await actionGetBookListsByListId(listId);
    setBooks(result);
  };

  return (
    <div className="p-2 border rounded-lg shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">Books in List</h2>
      <ul>
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book.id} className="p-2 border-b">
              {book.title} by {book.author}
            </li>
          ))
        ) : (
          <li>No books in this list.</li>
        )}
      </ul>
    </div>
  );
}
