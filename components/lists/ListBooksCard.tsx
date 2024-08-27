"use client";

import React from "react";
import { List } from "@/models/list";
import { Book } from "@/models/book";
import BookCardAdvanced from "../BookCardAdvanced";

interface BooksListProps {
    list: List | null;
    books: Book[];
}

export default function ListBooksCard({ list, books }: BooksListProps) {

  return (
    <div className="rounded-3xl shadow-xl shadow-sky-200 p-8 bg-sky-300 text-slate-100 h-full overflow-y-auto">
        <h1 className="font-light text-sky-700 text-center"><strong>{list?.books.length}</strong> Books in <i>{list?.name}</i></h1>
      <ul>
        {books.length > 0 ? (
          books.map((book, index) => (
            <li key={book.id} className="p-2 border-b">
              <BookCardAdvanced book={book} />
            </li>
          ))
        ) : (
          <li>No books in this list.</li>
        )}
      </ul>
    </div>
  );
}
