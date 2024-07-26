"use client"

import { actionSearchBooks } from '@/actions/search-books';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState, useCallback, HTMLAttributes } from 'react';

interface Option {
  label: string;
  imageUrl?: string;
  index: number;
}

export default function PreviewSearchBox() {
  const [options, setOptions] = useState<Option[]>([]);
  const [noOptionsText, setNoOptionsText] = useState("Waiting for your input!");
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = useCallback(
    async (_event: React.SyntheticEvent, query: string) => {
      setInputValue(query)
      try {
        const result = await actionSearchBooks(query, 0, 5);
        const mappedOptions = result.books.map((book, index) => ({
          label: `${book.title} by ${book.authors}`,
          imageUrl: book.smallThumbnail,
          index,
        }));
        mappedOptions.push({
          label: "See all results",
          imageUrl: "",
          index: 5
        });
        setOptions(mappedOptions.length > 0 ? mappedOptions : []);
      } catch (error) {
        console.error("Error fetching books:", error);
        setNoOptionsText("Error fetching results. Please try again.");
      }
    },
    []
  );

  const handleOptionsRendering = useCallback((props: HTMLAttributes<HTMLLIElement>, option: Option) => {

    if (option.index === 5) {
      return (<div className='flex justify-center'><li {...props}>{"See all results"}</li></div>)
    } else {
      return (<li {...props}>
        {option.imageUrl && (
          <img
            src={option.imageUrl}
            alt={option.label}
            style={{ width: 50, height: 75, marginRight: 10 }}
          />
        )}
        {option.label}
      </li>)
    }
  }, [])

  return (
    <Autocomplete
      filterOptions={(x) => x}
      className="bg-white"
      noOptionsText={noOptionsText}
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
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
          }}
          InputLabelProps={{
            shrink: false,
          }}
        />
      )}
    />
  );
}
