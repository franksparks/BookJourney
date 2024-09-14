import Rating from "@mui/material/Rating";
import { OverridableStringUnion } from "@mui/types";

type ReadRatingProps = {
  value: number;
  size?: string;
};

export default function ReadRating({ value, size }: ReadRatingProps) {
  const ratingSize = size ? size : "small";

  return (
    <div className="flex flex-row">
      <Rating
        className=""
        name="read-only"
        value={value}
        readOnly
        size={ratingSize as OverridableStringUnion<"small" | "large">}
      />
    </div>
  );
}
