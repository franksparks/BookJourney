"use client";

import { useCallback, useEffect } from "react";
import { Input } from "./ui/input";
import SearchRadioButtons from "./SearchRadioButtons";
import { Button } from "@/components/ui/button";
import { useBooksSearchContext } from "@/app/context/books-search-context";

type SearchBoxProps = {
  advancedQuery: string;
  radioValue: string;
  setAdvancedQuery: (advancedQuery: string) => void;
  handleAdvancedSearch: () => void;
  setPage: (page: number) => void;
  setTotalItems: (items: number) => void;
  setAvoidAdvancedSearch: (status: boolean) => void;
  setRadioValue: (option: string) => void;
};

// Todo: Change the img for the next.js Image component
export default function SearchBox({
  advancedQuery,
  radioValue,
  setAdvancedQuery,
  handleAdvancedSearch,
  setPage,
  setTotalItems,
  setAvoidAdvancedSearch,
  setRadioValue,
}: SearchBoxProps) {
  const { setResetRadio, setPreviewSearch } = useBooksSearchContext();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAdvancedQuery(event.target.value);
      setAvoidAdvancedSearch(true);
      setPreviewSearch(false);
    },
    [setAdvancedQuery, setAvoidAdvancedSearch]
  );

  const handleRadioButtonChange = useCallback(
    (event: React.SyntheticEvent) => {
      setRadioValue((event.target as HTMLInputElement).value);
      setAvoidAdvancedSearch(true);
    },
    [setRadioValue, setAvoidAdvancedSearch]
  );

  const onSearchButtonClick = useCallback(() => {
    handleAdvancedSearch();
  }, [handleAdvancedSearch]);

  const onSearchMouseDown = useCallback(() => {
    setTotalItems(0);
    setPage(1);
    setAvoidAdvancedSearch(false);
    setResetRadio(false);
  }, [setTotalItems, setPage, setAvoidAdvancedSearch]);

  return (
    <>
      <div className="flex flex-row pr-5">
        <Input
          className="mt-2 ml-5 w-96 rounded-none bg-white border-black"
          type="search"
          placeholder="Search by book title or author"
          value={advancedQuery}
          onChange={handleChange}
        />
        <Button
          onMouseDown={onSearchMouseDown}
          onClick={onSearchButtonClick}
          className="mt-2 ml-5"
        >
          Search
        </Button>
      </div>
      <SearchRadioButtons
        handleRadioButtonChange={handleRadioButtonChange}
        value={radioValue}
      />
    </>
  );
}
