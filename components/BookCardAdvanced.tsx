import { useDbUser } from "@/app/context/db-user-context";
import { capitalizeFirstLetter } from "@/lib/capitalize";
import { Book } from "@/models/book";
import { Tooltip } from "@mui/material";
import Image from "next/image";
import BookNavigationWrapper from "./BookNavigationWrapper";
import ReadingStatusDropwdown from "./ReadingStatusDropdown";

type bookCardAdvancedProps = {
  book: Book;
};

export default function BookCardAdvanced({ book }: bookCardAdvancedProps) {
  const { dbUser } = useDbUser();

  const logged = dbUser ? true : false;
  return (
    <div className="flex flex-row justify-between bg-sky-50 rounded-lg mx-auto shadow-md shadow-sky-800 hover:bg-sky-200 transition duration-500 max-w-xl">
      <div className="w-1/3 flex items-center justify-center min-w-fit">
        <BookNavigationWrapper id={book.googleBooksId}>
          {book.smallCover ? (
            <Image
              className="shadow-lg shadow-sky-600 rounded hover:scale-110 transition duration-1000 w-full h-auto"
              src={book.smallCover}
              alt={book.title}
              width="0"
              height="0"
              sizes="100vw"
            />
          ) : (
            <Image
              src={"/default_cover.jpg"}
              alt={book.title}
              width="0"
              height="0"
              sizes="75vw"
              className="rounded w-full h-auto"
            />
          )}
        </BookNavigationWrapper>
      </div>
      <div className="flex flex-col justify-center w-2/3 gap-2 m-2 mr-5 cursor-default">
        <BookNavigationWrapper id={book.googleBooksId}>
          <Tooltip arrow title={book.title} placement="top-start">
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
        <ReadingStatusDropwdown book={book} logged={logged} />
      </div>
    </div>
  );
}
