import { Book } from "@/models/book";
import Image from "next/image";
import BookStatusDropdown from "./BookStatusDropdown";
import { capitalizeFirstLetter } from "@/lib/capitalize";

type bookCardProps = {
  book: Book;
};

export default function AdvancedBookCard({ book }: bookCardProps) {
  return (
    <main className="flex flex-row hover:scale-105 m-1  rounded-lg hover:bg-slate-50 hover:text-sky-700 bg-slate-100 cursor-pointer transition duration-500 h-32 min-w-96 max-w-lg">
      {book.cover && (
        <div className="flex justify-center items-center p-2 w-1/3">
          <Image
            className="shadow-lg shadow-sky-600 rounded"
            src={book.cover}
            alt="cover"
            width={60}
            height={100}
          />
        </div>
      )}
      {!book.cover && (
        <div className="flex justify-center items-center p-2 w-1/3">
          <Image
            className="shadow-md shadow-sky-600 rounded"
            src="/default_cover.jpg"
            alt="cover"
            width={60}
            height={100}
          />
        </div>
      )}

      <div className="flex flex-col justify-center flex-grow p-2 w-2/3">
        <p className="italic text-lg mt-2 line-clamp-1">
          {capitalizeFirstLetter(book.title)}
        </p>
        <p className="text-sm">
          {book.authors && book.authors.length > 0
            ? capitalizeFirstLetter(book.authors.join(" "))
            : "Author not available"}
        </p>
        <div className="flex justify-center items-center p-1">
          <BookStatusDropdown />
        </div>
      </div>
    </main>
  );
}
