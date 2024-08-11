import { Book } from "@/models/book";
import Image from "next/image";
import { Button } from "./ui/button";

type bookCardProps = {
  book: Book;
};

export default function BookCard({ book }: bookCardProps) {
  console.log(book);
  return (
    <div className="flex flex-row m-4 w-72  hover:scale-105 shadow border border-white shadow-white rounded-lg  hover:bg-slate-50 hover:text-sky-700 transition duration-500">
      {book.cover && (
        <Image
          className="m-4 shadow-md shadow-white rounded"
          src={book.cover}
          alt="cover"
          width={60}
          height={100}
        />
      )}
      <div className="m-4 flex flex-col justify-start items-center w-full">
        <p className="italic">{book.title}</p>
        <p>
          {book.authors && book.authors.length > 0
            ? book.authors[0]
            : "Author not available"}
        </p>
        <Button className="mt-2 rounded-full"> Done</Button>
      </div>
    </div>
  );
}
