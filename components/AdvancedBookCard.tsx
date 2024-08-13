import { Book } from "@/models/book";
import Image from "next/image";
import BookStatusDropdown from "./BookStatusDropdown";

type bookCardProps = {
  book: Book;
};

export default function AdvancedBookCard({ book }: bookCardProps) {
  return (
    <main className="flex flex-row hover:scale-105 m-2  rounded-lg hover:bg-slate-50 hover:text-sky-700 bg-sky-600 cursor-pointer transition duration-500 ">
      {book.cover && (
        <div className="flex justify-center items-center p-4">
          <Image
            className="shadow-md shadow-white rounded"
            src={book.cover}
            alt="cover"
            width={60}
            height={100}
          />
        </div>
      )}

      <div className="flex flex-col justify-center p-4 flex-grow">
        <p className="italic">{book.title}</p>
        <p>
          {book.authors && book.authors.length > 0
            ? book.authors[0]
            : "Author not available"}
        </p>
      </div>

      <div className="flex justify-center items-center p-4">
        <BookStatusDropdown />
      </div>
    </main>
  );
}
