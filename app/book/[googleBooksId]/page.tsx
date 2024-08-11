"use client"

import { useBooksSearchContext } from "@/app/context/books-search-context";
import { Book } from '../../../models/book';

type PageProps = {
    params: {
        googleBooksId: string;

    }
};

export default async function Page({ params }: PageProps) {

    const { googleBooksId } = params;
    const { results } = useBooksSearchContext();

    const book: Book = results.find((book: Book) => book.googleBooksId ===  googleBooksId)

    return <div>{`I'll be the page for ${book.title}`}</div>;
}
