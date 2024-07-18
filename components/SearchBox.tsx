"use client";

import { useCallback, useState } from 'react';
import { Input } from './ui/input';
import { actionSearchBooks, Book } from '@/actions/search-books';

type SearchBoxProps = {
    onSearch: (books: Book[]) => void
    query: string,
    setQuery: (query: string) => void
}

export default function SearchBox({ onSearch, query, setQuery }: SearchBoxProps) {

    const handleKeyDown = useCallback((event: { key: string; }) => {
        if (event.key === 'Enter') {
            actionSearchBooks(query).then(books => {
                onSearch(books);
            })
        }
    }, [query, onSearch]);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }, []);

    return (
        <Input
            className="mt-2.5 ml-2.5 w-96"
            type="search"
            placeholder="Search..."
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    )
}