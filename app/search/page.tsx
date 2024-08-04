"use client"

import { Book, actionSearchBooks } from "@/actions/search-books";
import SearchBox from "@/components/SearchBox";
import SearchPagination from "@/components/SearchPagination";
import SearchResults from "@/components/SearchResults";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";

const queryMap: { [key: string]: string } = {
    "author": ":inauthor:",
    "title": ":intitle:",
    "all": "",
};

const calculateIndex = (page: number): number => {
    return (page - 1) * 10
}

const MAX_NUMBER_RESULTS = 10;

export default function Home() {
    const [results, setResults] = useState<Book[]>([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [advancedQuery, setAdvancedQuery] = useState('');
    const [radioValue, setRadioValue] = useState('all');
    const [avoidSearch, setAvoidSearch] = useState(false);
    const [avoidAdvancedSearch, setAvoidAdvancedSearch] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const performSearch = async (
        query: string,
        queryMap?: { [key: string]: string },
    ) => {
        try {
            const index = calculateIndex(page);
            const queryString = queryMap
                ? `${queryMap[radioValue]}${query}`
                : query;

            const result = await actionSearchBooks(queryString, index, MAX_NUMBER_RESULTS);
            setResults(result.books);
            if (totalItems === 0) {
                setTotalItems(result.totalItems);
            }
            if (queryMap && query) {
                router.push(`/search?q=${encodeURIComponent(query)}`);
            }
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    useEffect(() => {
        const urlQuery = searchParams.get('q');
        setAvoidAdvancedSearch(false)
        setAvoidSearch(false)
        if (urlQuery && urlQuery !== '') {
            setQuery(urlQuery);
            setAdvancedQuery(urlQuery);
        } else {
            router.push('/');
        }
    }, [searchParams, router]);

    useEffect(() => {
        handleSearch();
    }, [page, query, avoidSearch])

    useEffect(() => {
        handleAdvancedSearch();
    }, [page, avoidAdvancedSearch])

    const handleSearch = useCallback(() => {
        if (query && !avoidSearch) {
            performSearch(query);
        }
    }, [query, page, avoidSearch]);

    const handleAdvancedSearch = useCallback(() => {
        if (advancedQuery && !avoidAdvancedSearch) {
            performSearch(advancedQuery, queryMap);
        }
    }, [advancedQuery, page, radioValue, totalItems, avoidAdvancedSearch]);

    const handlePageChange = useCallback((newPage: number) => {
        setPage(newPage);
    }, []);

    return (
        <main className="flex justify-center flex-col items-center">
            <div className="bg-slate-300 mt-10" >
                <SearchBox query={query} advancedQuery={advancedQuery} setAdvancedQuery={setAdvancedQuery} handleAdvancedSearch={handleAdvancedSearch} setPage={setPage} setTotalItems={setTotalItems} setAvoidSearch={setAvoidSearch} setAvoidAdvancedSearch={setAvoidAdvancedSearch} setRadioValue={setRadioValue} radioValue={radioValue} />
            </div>
            <>{(query || advancedQuery) && results.length !== 0 && <SearchResults results={results} />}</>
            <>{(query || advancedQuery) && results.length !== 0 && <SearchPagination setPage={handlePageChange} page={page} totalItems={totalItems} />}</>
        </main>
    );
}
