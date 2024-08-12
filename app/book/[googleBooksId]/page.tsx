"use client"

import { useBooksSearchContext } from "@/app/context/books-search-context";
import { Book } from '../../../models/book';
import BookDetails from "@/components/BookDetails";
import { useEffect, useState } from "react";

type PageProps = {
    params: {
        googleBooksId: string;
    }
};

export default function Page({ params }: PageProps) {
    const { googleBooksId } = params;
    const { results } = useBooksSearchContext();
    const [book, setBook] = useState<Book>();

    useEffect(() => {
        const foundBook = results.find((book: Book) => book.googleBooksId === googleBooksId)
        setBook(foundBook);
    }, [googleBooksId]);


     return book && <BookDetails book={book} />;
}
