"use client";

import { useCallback, useState } from 'react';
import { Input } from './ui/input';
import { actionSearchBooks, Book } from '@/actions/search-books';

type SearchBoxProps = {
    onSearch: (event: { key: string }) => void
    query: string,
    setQuery: (query: string) => void
}

export default function SearchBox({ onSearch, query, setQuery }: SearchBoxProps) {

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
            onKeyDown={onSearch}
        />
    )
}