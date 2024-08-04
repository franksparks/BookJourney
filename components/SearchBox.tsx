"use client";

import { useCallback, useEffect } from 'react';
import { Input } from './ui/input';
import SearchRadioButtons from './SearchRadioButtons';
import { Button } from "@/components/ui/button"

type SearchBoxProps = {
    query: string,
    advancedQuery: string
    radioValue: string,
    setAdvancedQuery: (advancedQuery: string) => void,
    handleAdvancedSearch: () => void,
    setPage: (page: number) => void,
    setTotalItems: (items: number) => void,
    setAvoidSearch: (status: boolean) => void,
    setAvoidAdvancedSearch: (status: boolean) => void,
    setRadioValue: (option: string) => void,
}

// Todo: Change the img for the next.js Image component
export default function SearchBox({
    query, advancedQuery, setAdvancedQuery, handleAdvancedSearch,
    setPage, setTotalItems, setAvoidSearch, setAvoidAdvancedSearch, setRadioValue, radioValue
}: SearchBoxProps) {
    useEffect(() => {
        setAdvancedQuery(query);
    }, [query, setAdvancedQuery]);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setAdvancedQuery(event.target.value);
        setAvoidAdvancedSearch(true);
    }, [setAdvancedQuery, setAvoidAdvancedSearch]);

    const handleRadioButtonChange = useCallback((event: React.SyntheticEvent) => {
        setRadioValue((event.target as HTMLInputElement).value);
    }, [setRadioValue]);

    const onSearchButtonClick = useCallback(() => {
        handleAdvancedSearch();
    }, [handleAdvancedSearch]);

    const onSearchMouseDown = useCallback(() => {
        setTotalItems(0);
        setPage(1);
        setAvoidSearch(true);
        setAvoidAdvancedSearch(false);
    }, [setTotalItems, setPage, setAvoidSearch, setAvoidAdvancedSearch]);

    return (
        <>
            <div className='flex flex-row pr-5'>
                <Input
                    className="mt-5 ml-5 w-96 rounded-none bg-white border-black"
                    type="search"
                    placeholder="Search by book title, author or ISBN"
                    value={advancedQuery}
                    onChange={handleChange} />
                <Button onMouseDown={onSearchMouseDown} onClick={onSearchButtonClick} className='mt-5 ml-5'>
                    Search
                </Button>
            </div><SearchRadioButtons handleRadioButtonChange={handleRadioButtonChange} />
        </>
    );
}
