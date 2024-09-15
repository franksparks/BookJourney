import { useDbUser } from "@/app/context/db-user-context";
import { capitalizeFirstLetter } from "@/lib/capitalize";
import { Book, DbBook } from "@/models/book";
import { Tooltip } from "@mui/material";
import Image from "next/image";
import BookNavigationWrapper from "./BookNavigationWrapper";
import ReadingStatusDropdown from "./ReadingStatusDropdown";
import { TrashIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

type bookCardAdvancedProps = {
  deleteVisible: boolean;
  onStatusChange: () => void;
  onDelete: (bookId: string) => void;
  book: DbBook | Book;
};

export default function BookCardAdvanced({
  book,
  onStatusChange,
  deleteVisible,
  onDelete,
}: bookCardAdvancedProps) {
  const { dbUser } = useDbUser();
  const logged = dbUser ? true : false;
  const pathname = usePathname();

  const [imageSize, setImageSize] = useState("small");

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height > 600) {
        setImageSize("large");
      } else {
        setImageSize("small");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex flex-row justify-between bg-sky-50 rounded-lg mx-auto shadow-md shadow-sky-800 hover:bg-sky-200 transition duration-500 max-w-xl">
      <div className="w-1/3 flex items-center justify-center min-w-fit">
        <BookNavigationWrapper id={book.googleBooksId}>
          {book.smallCover ? (
            <Image
              className={`shadow-lg shadow-sky-600 rounded hover:scale-110 transition duration-1000 ${
                imageSize === "large" ? "w-20" : "w-10"
              } h-auto m-2`}
              src={book.smallCover}
              alt={book.title}
              width="0"
              height="0"
              sizes="100vw"
            />
          ) : (
            <Image
              className={`shadow-lg shadow-sky-600 rounded hover:scale-110 transition duration-1000 ${
                imageSize === "large" ? "w-20" : "w-10"
              } h-auto m-2`}
              src={"/default_cover.jpg"}
              alt={book.title}
              width="0"
              height="0"
              sizes="75vw"
            />
          )}
        </BookNavigationWrapper>
      </div>

      <div className="flex flex-col justify-center w-2/3 m-2 mr-5 cursor-default">
        {imageSize === "large" ? (
          <>
            <BookNavigationWrapper id={book.googleBooksId}>
              <Tooltip arrow title={book.title} placement="top-start">
                <b className="text-base line-clamp-1 text-sky-700">{`${capitalizeFirstLetter(
                  book.title || "Title not available"
                )}`}</b>
              </Tooltip>
            </BookNavigationWrapper>
            <Tooltip arrow title={book.authors} placement="bottom-start">
              <div className="text-base line-clamp-1 text-sky-700">
                by{" "}
                {book.authors && book.authors.length > 0
                  ? capitalizeFirstLetter(book.authors.join(" "))
                  : "Unknown"}
              </div>
            </Tooltip>
          </>
        ) : (
          <>
            <BookNavigationWrapper id={book.googleBooksId}>
              <Tooltip arrow title={book.title} placement="top-start">
                <b className="text-base line-clamp-1 text-sky-700">
                  {`${capitalizeFirstLetter(
                    book.title || "Title not available"
                  )}`}{" "}
                  by{" "}
                  {book.authors && book.authors.length > 0
                    ? capitalizeFirstLetter(book.authors.join(" "))
                    : "Unknown"}
                </b>
              </Tooltip>
            </BookNavigationWrapper>
          </>
        )}

        <div className="flex z-50">
          <ReadingStatusDropdown
            book={book}
            logged={logged}
            handleStatusChange={onStatusChange}
          />
          <Button
            onClick={() => onDelete(book.googleBooksId)}
            className={`bg-red-500 text-white rounded-full hover:bg-red-700 transition duration-300 p-1 pr-2 h-8 mt-auto mb-auto ${
              deleteVisible ? "flex" : "hidden"
            }`}
          >
            <TrashIcon className="w-5 h-5 mt-0.5" /> Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
