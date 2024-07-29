"use client"

import { Book, actionSearchBooks } from "@/actions/search-books";
import SearchBox from "@/components/SearchBox";
import SearchPagination from "@/components/SearchPagination";
import SearchResults from "@/components/SearchResults";
import { useState, useCallback, useEffect } from "react";

export default function Home() {
    const [results, setResults] = useState<Book[]>([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const urlQuery = new URLSearchParams(window.location.search).get('q');
        if (urlQuery) {
            setQuery(urlQuery);
            handleSearch();
        }       
    }, []);

    useEffect(() => {
        handleSearch();
    }, [page, query])

    const handleSearch = useCallback(() => {
        const index = (page - 1) * 10;
        if (!query) return
        actionSearchBooks(query, index, 10).then(result => {
            setResults(result.books);
            if (totalItems === 0) {
                setTotalItems(result.totalItems);
            }
        });
    }, [query, page]);

    const handlePageChange = useCallback((newPage: number) => {
        setPage(newPage);
    }, [handleSearch]);

    return (
        <main className="flex justify-center flex-col items-center">
            <div className="bg-slate-300 mt-10" >
                <SearchBox onSearch={handleSearch} query={query} setQuery={setQuery}/>
            </div>
            <>{query && <SearchResults results={results} />}</>
            <>{results.length !== 0 && query && <SearchPagination setPage={handlePageChange} page={page} totalItems={totalItems} />}</>
        </main>
    );
}
