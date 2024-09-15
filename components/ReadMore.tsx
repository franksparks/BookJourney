import { useState } from "react";

interface ReadMoreProps {
  text: string;
  amountOfWords?: number;
}

export default function ReadMore({
  text,
  amountOfWords = 36,
}: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const splittedText = text.split(" ");
  const itCanOverflow = splittedText.length > amountOfWords;
  const beginText = itCanOverflow
    ? splittedText.slice(0, amountOfWords - 1).join(" ")
    : text;
  const endText = splittedText.slice(amountOfWords - 1).join(" ");

  const handleKeyboard = (e: { code: string }) => {
    if (e.code === "Space" || e.code === "Enter") {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="mt-6">
      {beginText}
      {itCanOverflow && (
        <>
          {!isExpanded ? <span>... </span> : " "}

          <span
            className={`${!isExpanded && "hidden"}`}
            aria-hidden={!isExpanded}
          >
            {endText}
          </span>
          <span
            className="text-orange-500 ml-2"
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            onKeyDown={handleKeyboard}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show less" : "Show more"}
          </span>
        </>
      )}
    </div>
  );
}
