import Rating from "@mui/material/Rating";

type ReadRatingProps = {
  value: number;
};

export default function ReadRating({ value }: ReadRatingProps) {
  return <Rating name="read-only" value={value} readOnly size={"large"} />;
}
