import * as React from 'react';
import { common } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

type searchRadioButtonsProps = {
  handleRadioButtonChange: (event: React.SyntheticEvent) => void
}

export default function SearchRadioButtons({handleRadioButtonChange}: searchRadioButtonsProps) {

  const radioStyles = {
    color: common.black,
    '&.Mui-checked': {
      color: common.black,
    },
  };

  const options = [
    { value: 'all', label: 'All' },
    { value: 'title', label: 'Title' },
    { value: 'author', label: 'Author' },
  ];

  return (
    <FormControl>
      <RadioGroup className="ml-7" defaultValue="all" row>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio sx={radioStyles} />}
            label={option.label}
            onChange={handleRadioButtonChange}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
