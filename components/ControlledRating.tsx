import { Tooltip } from "@mui/material";
import Rating from "@mui/material/Rating";
import { forwardRef, useState } from "react";

type ConditionalTooltipProps = {
  logged: boolean;
  children: React.ReactElement;
};

type ControlledRatingProps = {
  logged: boolean;
};

interface CustomRatingProps {
  value: number | null;
  onChange: (event: React.ChangeEvent<{}>, newValue: number | null) => void;
  size: "small" | "medium" | "large";
  disabled: boolean;
}

function ConditionalTooltip({ logged, children }: ConditionalTooltipProps) {
  if (logged) {
    return <>{children}</>;
  }
  return (
    <Tooltip className=" text-white" title="Login to rate this book." arrow>
      {children}
    </Tooltip>
  );
}

const CustomRating = forwardRef<HTMLDivElement, CustomRatingProps>(
  ({ value, onChange, size, disabled, ...rest }, ref) => {
    return (
      <div {...rest} ref={ref}>
        <Rating
          value={value}
          onChange={onChange}
          size={size}
          disabled={disabled}
        />
      </div>
    );
  }
);

export default function ControlledRating({ logged }: ControlledRatingProps) {
  const [value, setValue] = useState<number | null>(0);

  return (
    <ConditionalTooltip logged={logged}>
      <CustomRating
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
        size="large"
        disabled={!logged}
      />
    </ConditionalTooltip>
  );
}
