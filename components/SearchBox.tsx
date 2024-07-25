"use client";

import { useCallback } from 'react';
import { Input } from './ui/input';

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
        <div className="flex"><Input
            className="mt-2.5 ml-2.5 mr-2.5 w-96"
            type="search"
            placeholder="Search..."
            value={query}
            onChange={handleChange}
            onKeyDown={onSearch} />
            <a href="https://books.google.com/">
                <img className="mt-5" src={"https://books.google.com/googlebooks/images/poweredby.png"} />
            </a>
        </div>
    )
}