"use client"

import { actionSearchBooks, Book } from '@/actions/search-books';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState, useCallback } from 'react';


export default function PreviewSearchBox() {

    const [options, setOptions] = useState<{ label: string, imageUrl: string | undefined, index: number }[]>([]);
    const [noOptionsSearch, setNoOptionsSearch] = useState("Waiting for your input!")

    
    return (
        <Autocomplete
            className="bg-white"
            noOptionsText={noOptionsSearch}
            size="small"
            disablePortal
            forcePopupIcon={false}
            onInputChange={ (event, query) => {

                const input = event.nativeEvent as InputEvent
                input.inputType
                console.log(input)
                if (input.inputType === 'deleteContentBackward' || event.nativeEvent instanceof FocusEvent) {
                    setOptions([]);
                    setNoOptionsSearch("Waiting for your input")
                } else {
                    setNoOptionsSearch("Searching....")
                    actionSearchBooks(query, 0, 5).then(result => {
    
                        
                        const mappedOptions = result.books.map((result, index) => ({ label: `${result.title} by ${result.authors}`, imageUrl: result.smallThumbnail, index: index }));
                        
                        console.log('LENGTH', mappedOptions.length)
    
                        if(mappedOptions.length === 5) {
                            mappedOptions.push({
                                label: 'LOLOLOLO',
                                imageUrl: undefined,
                                index: 0
                            })
    
                            console.log('les opsions', mappedOptions)
                        }
                        if (mappedOptions.length > 0) {
                             setOptions(mappedOptions);
                        }
                    });
                }
            }}
            options={options}
            renderOption={(props, option) => (
                <li {...props}>
                    {option.imageUrl && <img src={option.imageUrl} alt={option.label} style={{ width: 50, height: 75, marginRight: 10 }} />}
                    {option.label}
                </li>
                )}
            sx={{ width: 500 }}
            renderInput={(params) => <TextField {...params} sx={{
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
            }} label="Search..." />}
        />
    );
}