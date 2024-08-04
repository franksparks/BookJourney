"use client"

import { Book, actionSearchBooks } from "@/actions/search-books";
import SearchBox from "@/components/SearchBox";
import SearchPagination from "@/components/SearchPagination";
import SearchResults from "@/components/SearchResults";
import { useRouter } from "next/navigation";
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
    const router = useRouter();

    useEffect(() => {
        const urlQuery = new URLSearchParams(window.location.search).get('q');
        if (urlQuery && urlQuery !== '') {
            setQuery(urlQuery);
            setAdvancedQuery(urlQuery);
        }
    }, []);

    useEffect(() => {
        handleSearch();
    }, [page, query])

    useEffect(() => {
        handleAdvancedSearch();
    }, [page])

    const handleSearch = useCallback(() => {
        const index = calculateIndex(page);
        if (!query) return
        if (avoidSearch) return
        actionSearchBooks(query, index, MAX_NUMBER_RESULTS).then(result => {
            setResults(result.books);
            if (totalItems === 0) {
                setTotalItems(result.totalItems);
            }
        });
    }, [query, page]);

    const handleAdvancedSearch = useCallback(() => {
        const queryParameter = queryMap[radioValue];
        const index = calculateIndex(page);
        if (!advancedQuery) return
        actionSearchBooks(`${queryParameter}${advancedQuery}`, index, MAX_NUMBER_RESULTS).then(result => {
            router.push(`/search?q=${encodeURIComponent(advancedQuery)}`)
            setResults(result.books);
            if (totalItems === 0) {
                setTotalItems(result.totalItems);
            }
        });
    }, [advancedQuery, page, radioValue, totalItems]);

    const handlePageChange = useCallback((newPage: number) => {
        setPage(newPage);
    }, [page]);

    return (
        <main className="flex justify-center flex-col items-center">
            <div className="bg-slate-300 mt-10" >
                <SearchBox query={query} advancedQuery={advancedQuery} setAdvancedQuery={setAdvancedQuery} handleAdvancedSearch={handleAdvancedSearch} setPage={setPage} setTotalItems={setTotalItems} setAvoidSearch={setAvoidSearch} setRadioValue={setRadioValue} radioValue={radioValue} />
            </div>
            <>{(query || advancedQuery) && <SearchResults results={results} />}</>
            <>{(query || advancedQuery) && results.length !== 0 && <SearchPagination setPage={handlePageChange} page={page} totalItems={totalItems} />}</>
        </main>
    );
}
