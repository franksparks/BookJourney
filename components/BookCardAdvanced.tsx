import { capitalizeFirstLetter } from "@/lib/capitalize";
import AddToList from "./AddToList";
import { Book } from "@/models/book";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import BookNavigationWrapper from "./BookNavigationWrapper";

type bookCardAdvancedProps = {
  book: Book;
};

export default function BookCardAdvanced({ book }: bookCardAdvancedProps) {
  return (
    <div className="flex flex-row justify-between h-36 bg-sky-50 rounded-lg mx-4 shadow-md shadow-sky-800 hover:bg-sky-200 transition duration-500 max-w-xl">
      <div className="w-1/3 flex items-center justify-center p-2 min-w-fit">
        <BookNavigationWrapper id={book.googleBooksId}>
          {book.smallCover ? (
            <Image
              className=" shadow-lg shadow-sky-600 rounded hover:scale-110 transition duration-1000"
              src={book.smallCover}
              alt={book.title}
              width={70}
              height={100}
            />
          ) : (
            <Image
              className="rounded"
              src={"/default_cover.jpg"}
              alt={book.title}
              width={70}
              height={100}
            />
          )}
        </BookNavigationWrapper>
      </div>
      <div className="flex flex-col justify-center w-2/3 gap-2 m-2 mr-5 cursor-default">
        <BookNavigationWrapper id={book.googleBooksId}>
          <Tooltip arrow title={book.title} placement="bottom-start">
            <b className="text-base line-clamp-1">{`${capitalizeFirstLetter(
              book.title
            )}`}</b>
          </Tooltip>
        </BookNavigationWrapper>
        <Tooltip arrow title={book.authors} placement="bottom-start">
          <div className="text-base line-clamp-1">
            by{" "}
            {book.authors && book.authors.length > 0
              ? capitalizeFirstLetter(book.authors.join(" "))
              : "Unknown"}
          </div>
        </Tooltip>
        <AddToList />
      </div>
    </div>
  );
}
