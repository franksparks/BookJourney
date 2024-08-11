"use client"

import { actionSearchBooksGoogle } from "@/actions/search-books-google";
import { useBooksSearchContext } from "@/app/context/books-search-context";
import SearchBox from "@/components/SearchBox";
import SearchPagination from "@/components/SearchPagination";
import SearchResults from "@/components/SearchResults";
import { Book } from "@/models/book";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect, Suspense } from "react";

const queryMap: { [key: string]: string } = {
    "author": ":inauthor:",
    "title": ":intitle:",
    "all": "",
};

const calculateIndex = (page: number): number => {
    return (page - 1) * 10
}

const MAX_NUMBER_RESULTS = 10;

export default function AdvancedSearch() {
    const { results, setResults, resetRadio, previewSearch, setPreviewSearch} = useBooksSearchContext();
    const [advancedResults, setAdvancedResults] = useState<Book[]>([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [advancedQuery, setAdvancedQuery] = useState('');
    const [radioValue, setRadioValue] = useState('all');
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

            const result = await actionSearchBooksGoogle(queryString, index, MAX_NUMBER_RESULTS);
            setResults(result.books);
            setAdvancedResults(result.books);
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
        setAdvancedResults(results);
        setPreviewSearch(false);
        setAvoidAdvancedSearch(true);
        setPage(1);
        if(resetRadio) {
            setRadioValue('all');
        }
        if (urlQuery && urlQuery !== '') {
            setQuery(urlQuery);
        } else {
            router.push('/');
        }
    }, [searchParams, router]);


    useEffect(() => {
        handleAdvancedSearch();
    }, [page, advancedQuery, avoidAdvancedSearch])

    const handleAdvancedSearch = useCallback(() => {
        if (advancedQuery && !avoidAdvancedSearch && !previewSearch ) {
            performSearch(advancedQuery, queryMap);
        }
    }, [advancedQuery, page, radioValue, totalItems, avoidAdvancedSearch]);

    const handlePageChange = useCallback((newPage: number) => {
        setPage(newPage);
    }, []);

    return (
        <Suspense>
            <main className="flex justify-center flex-col items-center">
                <div className="bg-slate-300 mt-10" >
                    <SearchBox query={query} advancedQuery={advancedQuery} setAdvancedQuery={setAdvancedQuery} handleAdvancedSearch={handleAdvancedSearch} setPage={setPage} setTotalItems={setTotalItems} setAvoidAdvancedSearch={setAvoidAdvancedSearch} setRadioValue={setRadioValue} radioValue={radioValue} />
                </div>
                {(query || advancedQuery) && !previewSearch && advancedResults.length !== 0 && <SearchResults results={advancedResults}/>}
                {(query || advancedQuery) && advancedResults.length !== 0 && <SearchPagination setPage={handlePageChange} page={page} totalItems={totalItems} />}
            </main>
        </Suspense>
    );
}
