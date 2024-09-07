"use client";

import { useBooksSearchContext } from "@/app/context/books-search-context";
import { Book, DbBook } from "../../../models/book";
import BookDetails from "@/components/BookDetails";
import { useEffect, useState } from "react";
import { actionSearchBooksGoogle } from "@/actions/search-books-google";
import { actionGetBookByGoogleId } from "@/actions/books";

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
    let foundBook: Book | DbBook = results.find(
      (book: Book) => book.googleBooksId === googleBooksId
    );

    const bookInDb: DbBook = await actionGetBookByGoogleId(googleBooksId);

    if (bookInDb === null && foundBook === undefined) {
      const { books } = await actionSearchBooksGoogle(googleBooksId, 0);
      foundBook = books[0];
    } else  {
      foundBook = bookInDb;
    }

    setBook(foundBook);
  };

  useEffect(() => {
    getBook();
  }, [googleBooksId, setBook]);

  return book && <BookDetails book={book} />;
}
