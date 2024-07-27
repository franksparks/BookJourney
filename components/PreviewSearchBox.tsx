"use client";

import { actionSearchBooks } from "@/actions/search-books";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState, useCallback, HTMLAttributes } from "react";
import debounce from "lodash/debounce";

interface Option {
  label: string;
  imageUrl?: string;
  index: number;
}

export default function PreviewSearchBox() {

  const [options, setOptions] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState("");

  const searchBooks = async (query: string) => {
    try {
      setInputValue(query);
      if (query) {
        const result = await actionSearchBooks(query, 0, 5);
        setOptions([]);
        let mappedOptions = result.books.map((book, index) => ({
          label: `${book.title} by ${book.authors}`,
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

  const handleOptionsRendering = useCallback(
    (props: HTMLAttributes<HTMLLIElement>, option: Option) => {
      if (option.index === 5) {
        return (
          <div className="flex justify-center">
            <li {...props}>{"See all results"}</li>
          </div>
        );
      } else {
        return (
          <li {...props}>
            {option.imageUrl && (
              <img
                src={option.imageUrl}
                alt={option.label}
                style={{ width: 50, height: 75, marginRight: 10 }}
              />
            )}
            {option.label}
          </li>
        );
      }
    },
    []
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
            placeholder="Search..."
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
