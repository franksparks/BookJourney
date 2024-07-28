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

    const handleKeyDown = useCallback((event: { key: string; }) => {
        if (event.key === 'Enter') {
            handleSearch();
        } else if (event.key === 'Backspace') {
            setResults([]);
            setTotalItems(0);
        }
        handlePageChange(1);
    }, [handleSearch]);

    const handlePageChange = useCallback((newPage: number) => {
        setPage(newPage);
    }, [handleSearch]);

    useEffect(() => {
        handleSearch();
    }, [page])

    return (
        <main className="flex justify-center">
            <div className="bg-slate-300 w-1/3 mt-10" >
                <SearchBox onSearch={handleKeyDown} query={query} setQuery={setQuery} />
            </div>
            <>{query && <SearchResults results={results} />}</>
            <>{results.length !== 0 && query && <SearchPagination setPage={handlePageChange} page={page} totalItems={totalItems} />}</>
        </main>
    );
}
