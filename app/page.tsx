"use client"

import { actionSearchBooks, Book } from "@/actions/search-books";
import SearchBox from "@/components/SearchBox";
import SearchResults from "@/components/SearchResults";
import { useCallback, useEffect, useState } from "react";
import SearchPagination from '../components/SearchPagination';

export default function Home() {
  const [results, setResults] = useState<Book[]>([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const handleSearch = useCallback(() => {
    const index = (page - 1)*10;
    if(!query) return
    actionSearchBooks(query, index).then(books => {
      setResults(books);
    });
  }, [query, page]);

  const handleKeyDown = useCallback((event: { key: string; }) => {
    if (event.key === 'Enter') {
      handleSearch();
    } else if (event.key === 'Backspace') {
      setResults([]);
    }
    handlePageChange(1);
  }, [handleSearch]);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, [handleSearch]);

  useEffect (() => {
    handleSearch();
  }, [page])

  return (
    <main>
      <SearchBox onSearch={handleKeyDown} query={query} setQuery={setQuery} />
      <>{query && <SearchResults results={results} />}</>
      <>{results.length !== 0 && query && <SearchPagination setPage={handlePageChange} page={page} />}</>
    </main>
  );
}
