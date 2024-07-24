"use client"

import { actionSearchBooks, Book } from '@/actions/search-books';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useCallback, useState } from 'react';
import { InputProps } from './ui/input';

export default function PreviewSearchBox() {

    const [options, setOptions] = useState<{label: string}[]>([]);

    return (
        <Autocomplete
            className="bg-white"
            size="small"
            disablePortal
            forcePopupIcon={false}
            onInputChange={(event, query) => {

                const input = event.nativeEvent as InputEvent
                input.inputType
                console.log(input)
                if (input.inputType === 'deleteContentBackward' || event.nativeEvent instanceof FocusEvent) {
                    setOptions([]);
                } else {
                    actionSearchBooks(query, 0, 5).then(result => {
                        let mappedOptions = result.books.map((result) => ({ label: result.title }));
                        //mappedOptions = [...mappedOptions, { label: 'See all results' }]
                        mappedOptions.push({ label: 'See all results' });
                        console.log('mappedOptions', mappedOptions)
                        setOptions(mappedOptions);
                    });
                }
            }}
            options={options}
            sx={{ width: 500 }}
            renderInput={(params) => <TextField {...params} label="Search..." />}
        />
    );
}