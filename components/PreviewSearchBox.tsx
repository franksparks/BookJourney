"use client";

import { actionSearchBooksGoogle } from "@/actions/search-books-google";
import { useBooksSearchContext } from "@/app/context/books-search-context";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import debounce from "lodash/debounce";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HTMLAttributes, useCallback, useRef, useState } from "react";
import BookNavigationWrapper from "./BookNavigationWrapper";

interface Option {
  label: string;
  imageUrl?: string;
  googleBooksId: string;
  index: number;
}

const FIXED_TOTAL_ITEMS = 200;

export default function PreviewSearchBox() {
  const { setResults, setPreviewSearch, setTotalItems } =
    useBooksSearchContext();
  const [previewResults, setPreviewResults] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { setResetRadio } = useBooksSearchContext();

  const searchBooks = async (query: string) => {
    if (!query) {
      setPreviewResults([]);
      return;
    }

    try {
      const result = await actionSearchBooksGoogle(query, 0);
      setResults(result.books);

      const totalItems =
        result.totalItems >= FIXED_TOTAL_ITEMS
          ? FIXED_TOTAL_ITEMS
          : result.totalItems;

      setTotalItems(totalItems);
      const firstFiveBooks = result.books.slice(0, 5);
      const mappedOptions = firstFiveBooks.map((book, index) => ({
        label: `${book.title} by ${
          book.authors?.length ? book.authors.join(", ") : "Unknown Author"
        }`,
        imageUrl: book.smallCover,
        googleBooksId: book.googleBooksId,
        index,
      }));

      mappedOptions.push({
        label: "See all results",
        imageUrl: "",
        googleBooksId: "",
        index: 5,
      });

      setPreviewResults(mappedOptions);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const debouncedSearchBooks = useCallback(debounce(searchBooks, 300), []);

  const handleInputChange = (
    _event: React.SyntheticEvent,
    query: string
  ) => {
    setInputValue(query);
    debouncedSearchBooks(query);
  };

  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleRedirect = () => {
    setPreviewSearch(true);
    setResetRadio(true);
    router.push(`/search?q=${encodeURIComponent(inputValue)}`);
    handleBlur();
  };

  const clearValues = useCallback(() => {
    setInputValue("");
    setPreviewResults([]);
  }, []);

  const handleOptionsRendering = useCallback(
    (props: HTMLAttributes<HTMLLIElement>, option: Option) => {
      const { children, ...otherProps } = props;

      if (option.index === 5) {
        return (
          <div
            className="flex justify-center"
            key={option.index}
            onMouseDown={(event) => {
              event.preventDefault();
              handleRedirect();
              clearValues();
            }}
          >
            <li {...otherProps} key={option.index}>
              {"See all results"}
            </li>
          </div>
        );
      } else {
        return (
          <BookNavigationWrapper
            key={option.googleBooksId}
            id={option.googleBooksId}
            clearValues={clearValues}
            handleBlur={handleBlur}
          >
            <li {...otherProps}>
              <Image
                src={option.imageUrl || "/default_cover.jpg"}
                alt={option.label}
                width="0"
                height="0"
                sizes="250vw"
                className="w-1/12 h-auto mr-2"
              />
              {option.label}
            </li>
          </BookNavigationWrapper>
        );
      }
    },
    [inputValue]
  );

  return (
    <div className="flex">
      <Autocomplete
        filterOptions={(x) => x}
        className="bg-orange-100 mt-4 mb-4 mr-4 rounded-md border-none"
        size="small"
        disablePortal
        forcePopupIcon={false}
        onInputChange={handleInputChange}
        options={previewResults}
        open={inputValue.length > 0 && previewResults.length > 0}
        renderOption={handleOptionsRendering}
        sx={{ width: 500 }}
        renderInput={(params) => (
          <TextField
            {...params}
            inputRef={inputRef}
            placeholder="Search books"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
            InputLabelProps={{
              shrink: false,
            }}
          />
        )}
      />
      <a
        href="https://books.google.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          width="0"
          height="0"
          sizes="250vw"
          className="w-full h-auto mt-5"
          src={"https://books.google.com/googlebooks/images/poweredby.png"}
          alt={"Google logo"}
        />
      </a>
    </div>
  );
}
