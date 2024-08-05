import { actionUpdateRating } from "@/actions/ratings";
import { RatingValue } from "@prisma/client";

if (process.argv.length != 4) {
  console.error("Usage: bun update-rating.ts <rating_id>  <rating_value>");
  process.exit(1);
}

const isValidRatingValue = (value: string): value is RatingValue => {
  return Object.values(RatingValue).includes(value as RatingValue);
};

const [_bun, _script, rating_id, rating_value] = process.argv;

if (!isValidRatingValue(rating_value)) {
  console.error(
    `Invalid rating value: ${rating_value}. Valid values are: ${Object.values(
      RatingValue
    ).join(", ")}`
  );
  process.exit(1);
}

const result = await actionUpdateRating(rating_value, rating_id);

if (result != null) {
  console.log(result);
  process.exit(0);
} else {
  process.exit(1);
}
