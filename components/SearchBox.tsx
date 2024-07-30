"use client";

import { useCallback, useEffect, useState } from 'react';
import { Input } from './ui/input';
import SearchRadioButtons from './SearchRadioButtons';
import { Button } from "@/components/ui/button"
import { actionSearchBooks, Book } from '@/actions/search-books';

type SearchBoxProps = {
    query: string,
    setResults: (results: Book[]) => {},
    setTotalItems: (item: number) => {},
    totalItems: number
}

// Todo: Change the img for the next.js Image component
export default function SearchBox({query, setResults, setTotalItems, totalItems }: SearchBoxProps) {
    const [advancedQuery, setAdvancedQuery] = useState(query);
    useEffect(() => {
        setAdvancedQuery(query);
    }, [query]);
    
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setAdvancedQuery(event.target.value); 
    }, [setAdvancedQuery]); 

    const handleSearch = useCallback(() => {
        //const index = (page - 1) * 10;
        if (!advancedQuery) return
        actionSearchBooks(advancedQuery, 1, 10).then(result => {
            setResults(result.books);
            if (totalItems === 0) {
                setTotalItems(result.totalItems);
            }
        });
    }, [advancedQuery]);


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
                <Button onClick={handleSearch} className='mt-5 ml-5'>Search</Button>
            </div>
            <SearchRadioButtons />
        </>
    )
}