"use client";

import { actionSearchBooks } from "@/actions/search-books";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState, useCallback, HTMLAttributes, useRef } from "react";
import debounce from "lodash/debounce";
import { useRouter } from "next/navigation";

interface Option {
  label: string;
  imageUrl?: string;
  index: number;
}

export default function PreviewSearchBox() {
  const [options, setOptions] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);


  const searchBooks = async (query: string) => {
    try {
      if (query) {
        const result = await actionSearchBooks(query, 0, 5);
        setOptions([]);
        let mappedOptions = result.books.map((book, index) => ({
          label: `${book.title} by ${book.authors ?? 'Unknown Author'}`,
          imageUrl: book.smallThumbnail,
          index,
        }));
        mappedOptions.push({
          label: "See all results",
          imageUrl: "",
          index: 5,
        });
        mappedOptions = mappedOptions.length > 0 ? mappedOptions : []
        setOptions(mappedOptions);
      } else {
        setOptions([]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const debouncedSearchBooks = useCallback(
    debounce(searchBooks, 300),
    []
  );

  const handleInputChange = (_event: React.SyntheticEvent, query: string) => {
    setInputValue(query);
    debouncedSearchBooks(query);
  }

  const handleRedirect = () => {
    router.push(`/search?query=${encodeURIComponent(inputValue)}`);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const clearValues = useCallback(() => {
    setInputValue("");
    setOptions([]);
  }, []);

  const handleOptionsRendering = useCallback(
    (props: HTMLAttributes<HTMLLIElement>, option: Option) => {
      if (option.index === 5) {
        return (
          <div className="flex justify-center" onMouseDown={(event) => {
            event.preventDefault();
            handleRedirect();
            clearValues();
          }}>
            <li {...props}>{"See all results"}</li>
          </div>
        );
      } else {
        return (
          <li {...props}>
            {option.imageUrl ? (
              <img
                src={option.imageUrl}
                alt={option.label}
                style={{ width: 50, height: 75, marginRight: 10, objectFit: 'cover' }}
              />
            ) : (
              <img
                src="../default_cover.jpg"
                alt={`Unknown cover for: ${option.label}`}
                style={{ width: 50, height: 75, marginRight: 10, objectFit: 'cover' }}
              />
            )}
            {option.label}
          </li>
        );
      }
    },
    [inputValue]
  );

  return (
    <div className="flex">
      <Autocomplete
        filterOptions={(x) => x}
        className="bg-white mt-4 mb-4 mr-4"
        size="small"
        disablePortal
        forcePopupIcon={false}
        onInputChange={handleInputChange}
        options={options}
        open={inputValue.length > 0 && options.length > 0}
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
      <a href="https://books.google.com/">
        <img className="mt-5" src={"https://books.google.com/googlebooks/images/poweredby.png"} />
      </a>
    </div>
  );
}
