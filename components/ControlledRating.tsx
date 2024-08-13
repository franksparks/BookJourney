import * as React from "react";
import Rating from "@mui/material/Rating";

export default function ControlledRating() {
  const [value, setValue] = React.useState<number | null>(0);

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
