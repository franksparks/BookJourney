import BookCardAdvanced from "./BookCardAdvanced";
import { Book } from "@/models/book";
import { useDbUser } from "@/app/context/db-user-context";

type SearchResultProps = {
  books: Book[];
};

export default function SearchResult({ books }: SearchResultProps) {
  const { dbUser } = useDbUser();

  const logged = dbUser ? true : false;
  return (
    <div className="grid grid-cols-2 grid-rows-5 gap-4 m-4 w-4/5">
      {books.map((book: Book, index) => (
        <div key={index}>
          <BookCardAdvanced book={book} />
        </div>
      ))}
    </div>
  );
}
