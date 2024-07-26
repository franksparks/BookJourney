"use client"

import { actionSearchBooks, Book } from '@/actions/search-books';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState, useCallback, useEffect } from 'react';

interface Option {
  label: string;
  imageUrl?: string;
  index: number;
}

export default function PreviewSearchBox() {
  const [options, setOptions] = useState<Option[]>([]);
  //const [noOptionsText, setNoOptionsText] = useState("Waiting for your input!");
 //const [search, setSearch] = useState('');

  const handleInputChange = useCallback(
    async (event: React.SyntheticEvent, query: string) => {
      const inputEvent = event.nativeEvent as InputEvent;
      if (
        inputEvent.inputType === 'deleteContentBackward' || 
        event.nativeEvent instanceof FocusEvent
      ) {
        setOptions([]);
       // setNoOptionsText("Waiting for your input");
      } else {
       // setNoOptionsText("Searching...");

        try {
          const result = await actionSearchBooks(query, 0, 5);

          console.log(result.books)
          
          const mappedOptions = result.books.map((book, index) => ({
            label: `${book.title} by ${book.authors}`,
            imageUrl: book.smallThumbnail,
            index,
          }));

          mappedOptions.push( {
            label: "See all results",
            imageUrl: "test",
            index:0
          });

          console.log('Mapped options', mappedOptions)

          //setOptions(mappedOptions.length > 0 ? mappedOptions : []);
          setOptions(mappedOptions)
          //setSearch(query);
        } catch (error) {
          console.error("Error fetching books:", error);
          //setNoOptionsText("Error fetching results. Please try again.");
        }
      }
    },
    [] 
  );

  const handleSomething = useCallback ((props, option) => {
    
    //console.log('Props', props);
    console.log('Option', option)
    
    return  (<li {...props}>
    {option.imageUrl && (
      <img
        src={option.imageUrl}
        alt={option.label}
        style={{ width: 50, height: 75, marginRight: 10 }}
      />
    )}
    {option.label} 
  </li>)
  }, [])
  /*
  (props, option) => (
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
  )*/

  /*
  useEffect(() => {
    setOptions(
      [
        ...options,
        {
          label: "See all results",
          imageUrl: undefined,
          index:0
        }
      ])
  }, [search]); */

  /*
  renderOption={(props, option) => (
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
  )}*/

  return (
    <Autocomplete
      className="bg-white"
      //noOptionsText={noOptionsText}
      size="small"
      disablePortal
      forcePopupIcon={false}
      onInputChange={handleInputChange}
      options={options}
      renderOption={handleSomething}
      sx={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white', // Cambia el color del borde aquí
              },
              '&:hover fieldset': {
                borderColor: 'white', // Color del borde al pasar el ratón
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white', // Color del borde cuando está enfocado
              },
            },
          }}
          label="Search..."
        />
      )}
    />
  );
}
