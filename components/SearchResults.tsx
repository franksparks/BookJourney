import { DbBook } from "@/models/book";
import BookCardAdvanced from "./BookCardAdvanced";

type SearchResultProps = {
  books: DbBook[];
};

export default function SearchResult({ books }: SearchResultProps) {
  return (
    <div className="grid grid-cols-2 grid-rows-5 gap-2 m-2 w-4/5 h-full">
      {books.map((book: DbBook, index) => (
        <div key={index}>
          <BookCardAdvanced
            book={book}
            deleteVisible={false}
            onDelete={() => {}}
            onStatusChange={() => {}}
          />
        </div>
      ))}
    </div>
  );
}
