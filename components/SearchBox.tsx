"use client";

import { useState } from 'react';
import { Input } from './ui/input';

export default function SearchBox() {
    const [query, setQuery] = useState('');
    const handleKeyDown = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            console.log(query);
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