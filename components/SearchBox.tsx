"use client";

import { useCallback } from 'react';
import { Input } from './ui/input';
import SearchRadioButtons from './SearchRadioButtons';

type SearchBoxProps = {
    onSearch: (event: { key: string }) => void
    query: string,
    setQuery: (query: string) => void
}

// Todo: Change the img for the next.js Image component
export default function SearchBox({ onSearch, query, setQuery }: SearchBoxProps) {
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }, []);

    return (
        <><Input
            className="mt-5 ml-5 w-96 rounded-none bg-white border-black"
            type="search"
            placeholder="Search by book title, author or ISBN"
            value={query}
            onChange={handleChange}
            onKeyDown={onSearch} />
            <SearchRadioButtons /></>
    )
}