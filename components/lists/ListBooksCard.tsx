"use client";

import React, { useState, useEffect } from "react";
import { actionGetBookListsByListId } from "@/actions/book-list";
import { List } from "@/models/list";
import { Book } from "@/models/book";

interface BooksListProps {
    list: List | null;
    books: Book[];
}

export default function ListBooksCard({ list, books }: BooksListProps) {

  return (
    <div className="rounded-3xl shadow-xl shadow-sky-200 p-8 bg-sky-300 text-slate-100 h-full overflow-y-auto">
        <h1 className="font-light text-sky-700 text-center">Books in <i>{list?.name}</i></h1>
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
