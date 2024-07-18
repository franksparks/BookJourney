"use client"

import { actionSearchBooks, Book } from "@/actions/search-books";
import SearchBox from "@/components/SearchBox";
import SearchResults from "@/components/SearchResults";
import { useCallback, useState } from "react";

export default function Home() {
  const [results, setResults] = useState<Book[]>([]);
  const [query, setQuery] = useState('');

  const handleSearch = useCallback((event: { key: string; }) => {
    if (event.key === 'Enter') {
        actionSearchBooks(query).then(books => {
          setResults(books);
        })
    }
}, [query]);

  return (
    <main>
      <SearchBox onSearch={handleSearch} query={query} setQuery={setQuery} />
      <SearchResults results={results} />
    </main>
  );
}
