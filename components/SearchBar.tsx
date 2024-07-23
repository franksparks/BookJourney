"use client"

import { actionSearchBooks, Book } from "@/actions/search-books";
import SearchBox from "@/components/SearchBox";
import SearchResults from "@/components/SearchResults";
import { useCallback, useEffect, useState } from "react";
import SearchPagination from '@/components/SearchPagination';

export default function SearchBar() {
  const [results, setResults] = useState<Book[]>([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const handleSearch = useCallback(() => {
    const index = (page - 1) * 10;
    if (!query) return
    actionSearchBooks(query, index).then(result => {
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
    <main>
      <SearchBox onSearch={handleKeyDown} query={query} setQuery={setQuery} />
      <>{query && <SearchResults results={results} />}</>
      <>{results.length !== 0 && query && <SearchPagination setPage={handlePageChange} page={page} totalItems={totalItems} />}</>
    </main>
  );
}
