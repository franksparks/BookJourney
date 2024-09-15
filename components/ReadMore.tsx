import { useState } from "react";

interface ReadMoreProps {
  text: string;
  initialWords?: number;
  maxWords?: number;
}

export default function ReadMore({
  text,
  initialWords = 36,
  maxWords = 75,
}: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const splittedText = text.split(" ");

  const itCanOverflow = splittedText.length > initialWords;
  const maxLengthExceeded = splittedText.length > maxWords;

  const beginText = itCanOverflow
    ? splittedText.slice(0, initialWords).join(" ")
    : text;

  const fullText = splittedText.slice(0, maxWords).join(" ");
  const remainingText = splittedText.slice(maxWords).join(" ");

  const handleKeyboard = (e: { code: string }) => {
    if (e.code === "Space" || e.code === "Enter") {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="mt-2">
      {!isExpanded ? beginText : fullText}

      {itCanOverflow && (
        <>
          {!isExpanded ? <span>... </span> : null}

          {isExpanded && maxLengthExceeded && <span>... </span>}

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
