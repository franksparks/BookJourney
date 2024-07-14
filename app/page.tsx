"use client"

import { Book } from "@/actions/search-books";
import SearchBox from "@/components/SearchBox";
import SearchResults from "@/components/SearchResults";
import { useState } from "react";

export default function Home() {
  const [results, setResults] = useState<Book[]>([]);

  const handleSearch = (books: Book[]) => {
    setResults(books);
  };

  return (
    <main>
      <SearchBox onSearch={handleSearch} />
      <SearchResults results={results} />
    </main>
  );
}
