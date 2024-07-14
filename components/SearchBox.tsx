"use client";

import { useState } from 'react';
import { Input } from './ui/input';
import { actionSearchBooks, Book } from '@/actions/search-books';

type SearchBoxProps = {
    onSearch: (books: Book[]) => void
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
    const [query, setQuery] = useState('');
    const handleKeyDown = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            actionSearchBooks(query).then(books => {
                onSearch(books);
            })
        }
    };
    return (
        <Input
            className="mt-2.5 ml-2.5 w-96"
            type="search"
            placeholder="Search..."
            value={query}
            onChange={(input) => setQuery(input.target.value)}
            onKeyDown={handleKeyDown}
        />
    )
}