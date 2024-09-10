"use client";

import { actionSearchBooksGoogle } from "@/actions/search-books-google";
import { useBooksSearchContext } from "@/app/context/books-search-context";
import SearchBox from "@/components/SearchBox";
import ParametrizedPagination from "@/components/ParametrizedPagination";
import SearchResults from "@/components/SearchResults";
import { DbBook } from "@/models/book";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect, Suspense } from "react";
import { catchErrors } from "@/lib/error-handling";

const queryMap: { [key: string]: string } = {
  author: ":inauthor:",
  title: ":intitle:",
  all: ""
};

const calculateIndex = (page: number): number => {
  return (page - 1) * 10;
};

const FIXED_TOTAL_ITEMS = 200;

export default function Home() {
  const {
    results,
    setResults,
    resetRadio,
    previewSearch,
    setPreviewSearch,
    setTotalItems,
    totalItems
  } = useBooksSearchContext();
  const [advancedResults, setAdvancedResults] = useState<DbBook[]>([]);
  const [advancedTotalItems, setAdvancedTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [advancedQuery, setAdvancedQuery] = useState("");
  const [radioValue, setRadioValue] = useState("all");
  const [avoidAdvancedSearch, setAvoidAdvancedSearch] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const performSearch = async (
    query: string,
    queryMap?: { [key: string]: string }
  ) => {
    catchErrors(async () => {
      const index = calculateIndex(page);

      const queryString = queryMap ? `${queryMap[radioValue]}${query}` : query;

      const result = await actionSearchBooksGoogle(queryString, index);

      const googleBooksIds: string[] = result.books.map(
        (book) => book.googleBooksId
      );
      const booksInDb = await 
      
      
      
      (googleBooksIds);
      const resultWithBooksInDb = result.books.map((book) => {
        const bookInDb = booksInDb.find(
          (dbBook: DbBook) => dbBook.googleBooksId === book.googleBooksId
        );
        return {
          ...book,
          ...(bookInDb ? bookInDb : {}),
          bookStatuses: bookInDb ? bookInDb.bookStatuses : []
        };
      });

      setResults(resultWithBooksInDb);
      const totalItems =
        result.totalItems >= FIXED_TOTAL_ITEMS
          ? FIXED_TOTAL_ITEMS
          : result.totalItems;
      setTotalItems(totalItems);
      setAdvancedResults(resultWithBooksInDb);

      if (advancedTotalItems === 0) {
        setAdvancedTotalItems(totalItems);
      }
      if (queryMap && query) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
    });
  };

  useEffect(() => {
    const urlQuery = searchParams?.get("q");
    setAdvancedResults(results);
    setAdvancedTotalItems(totalItems);
    setPage(1);
    if (resetRadio) {
      setRadioValue("all");
    }
    if (urlQuery && urlQuery !== "") {
      setAdvancedQuery(urlQuery);
    } else {
      router.push("/");
    }
  }, [searchParams, router]);

  const handleAdvancedSearch = useCallback(() => {
    if (advancedQuery && !avoidAdvancedSearch && !previewSearch) {
      performSearch(advancedQuery, queryMap);
    }
  }, [advancedQuery, page, radioValue, totalItems, avoidAdvancedSearch]);

  useEffect(() => {
    handleAdvancedSearch();
  }, [handleAdvancedSearch]);

  const handlePageChange = useCallback((newPage: number) => {
    setPreviewSearch(false);
    setPage(newPage);
  }, []);

  return (
    <Suspense>
      <main className="flex justify-center flex-col items-center h-full">
        <div className="flex justify-center flex-col items-center bg-sky-600 m-3 rounded-3xl w-5/6 min-w-fit">
          <div className="bg-slate-300 mt-4 rounded-md min-w-fit shadow-md shadow-sky-800">
            <SearchBox
              advancedQuery={advancedQuery}
              setAdvancedQuery={setAdvancedQuery}
              handleAdvancedSearch={handleAdvancedSearch}
              setPage={setPage}
              setTotalItems={setAdvancedTotalItems}
              setAvoidAdvancedSearch={setAvoidAdvancedSearch}
              setRadioValue={setRadioValue}
              radioValue={radioValue}
            />
          </div>
          {advancedResults.length !== 0 && (
            <SearchResults books={advancedResults} />
          )}
          {advancedResults.length !== 0 && (
            <ParametrizedPagination
              setPage={handlePageChange}
              page={page}
              totalItems={advancedTotalItems}
              numItemsPerPage={10}
            />
          )}
        </div>
      </main>
    </Suspense>
  );
}
