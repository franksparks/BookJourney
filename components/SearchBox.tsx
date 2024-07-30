"use client";

import { useCallback, useEffect, useState } from 'react';
import { Input } from './ui/input';
import SearchRadioButtons from './SearchRadioButtons';
import { Button } from "@/components/ui/button"

type SearchBoxProps = {
    query: string,
    advancedQuery: string
    setAdvancedQuery: (advancedQuery: string) => void,
    handleAdvancedSearch: () => void,
    setPage: (page: number) => void,
    setTotalItems: (items: number) => void
    setAvoidSearch: (status: boolean) => void
}

// Todo: Change the img for the next.js Image component
export default function SearchBox({ query, advancedQuery, setAdvancedQuery, handleAdvancedSearch, setPage, setTotalItems, setAvoidSearch }: SearchBoxProps) {
    useEffect(() => {
        setAdvancedQuery(query);
    }, []);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setAdvancedQuery(event.target.value);
    }, [setAdvancedQuery]);

    return (
        <>
            <div className='flex flex-row pr-5'>
                <Input
                    className="mt-5 ml-5 w-96 rounded-none bg-white border-black"
                    type="search"
                    placeholder="Search by book title, author or ISBN"
                    value={advancedQuery}
                    onChange={handleChange}
                />
                <Button onMouseDown={() => {setTotalItems(0); setPage(1); setAvoidSearch(true)}} onClick={handleAdvancedSearch} className='mt-5 ml-5'>Search</Button>
            </div>
            <SearchRadioButtons />
        </>
    )
}