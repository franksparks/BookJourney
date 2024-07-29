"use client";

import { useCallback, useEffect } from 'react';
import { Input } from './ui/input';
import SearchRadioButtons from './SearchRadioButtons';
import { Button } from "@/components/ui/button"

type SearchBoxProps = {
    onSearch: () => void
    query: string,
    setQuery: (query: string) => void
}

// Todo: Change the img for the next.js Image component
export default function SearchBox({ onSearch, query, setQuery }: SearchBoxProps) {

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value); 
        onSearch();
    }, [setQuery]); 

    return (
        <>
            <div className='flex flex-row pr-5'>
                <Input
                    className="mt-5 ml-5 w-96 rounded-none bg-white border-black"
                    type="search"
                    placeholder="Search by book title, author or ISBN"
                    value={query}
                    onChange={handleChange}
                 />
                <Button onClick={onSearch} className='mt-5 ml-5'>Search</Button>
            </div>
            <SearchRadioButtons />
        </>
    )
}