import { Book } from "@/models/book";
import BookNavigationWrapper from "./BookNavigationWrapper";
import BookCardAdvanced from "./BookCardAdvanced";

type SearchResultProps = {
  results: Book[];
};
// Todo: Change the img for the next.js Image component
export default function SearchResult({ results }: SearchResultProps) {
  return (
    <div className="grid grid-cols-2 grid-rows-5 gap-4 p-12">
      {results.map((result: Book, index) => (
        <div key={index}>
          <BookNavigationWrapper id={result.googleBooksId}>
            <BookCardAdvanced book={result} />
          </BookNavigationWrapper>
        </div>
      ))}
    </div>
  );
}
