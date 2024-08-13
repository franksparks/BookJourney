"use client";

import { useBooksSearchContext } from "@/app/context/books-search-context";
import { Book } from "../../../models/book";
import BookDetails from "@/components/BookDetails";
import { useEffect, useState } from "react";
import { actionSearchBooksGoogle } from "@/actions/search-books-google";

type PageProps = {
  params: {
    googleBooksId: string;
  };
};
export default function Page({ params }: PageProps) {
  const { googleBooksId } = params;
  const { results } = useBooksSearchContext();
  const [book, setBook] = useState<Book>();

  const getBook = async () => {
    let foundBook: Book = results.find(
      (book: Book) => book.googleBooksId === googleBooksId
    );

    if (!foundBook) {
      const { books } = await actionSearchBooksGoogle(googleBooksId, 0);
      foundBook = books[0];
    }
    setBook(foundBook);
  };

  useEffect(() => {
    getBook();
  }, [googleBooksId, setBook]);

  return book && <BookDetails book={book} />;
}
