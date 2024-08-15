import Rating from "@mui/material/Rating";
import { useState } from "react";

export default function ControlledRating() {
  const [value, setValue] = useState<number | null>(0);

  return (
    <Rating
      name="simple-controlled"
      value={value}
      onChange={(_event, newValue) => {
        setValue(newValue);
      }}
      size="large"
    />
  );
}
