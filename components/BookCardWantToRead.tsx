import { actionUpdateBookStatus } from "@/actions/book-status";
import { Book } from "@/models/book";
import { BookStatus } from "@/models/book-status";
import { Tooltip } from "@mui/material";
import { ReadStatus } from "@prisma/client";
import Image from "next/image";
import BookNavigationWrapper from "./BookNavigationWrapper";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

type bookCardProps = {
  book: Book;
  status: BookStatus;
  onStatusChange: () => void;
  newBookSignal: (bool: boolean) => boolean;
};

export default function BookCardWantToRead({
  book,
  status,
  onStatusChange,
  newBookSignal,
}: bookCardProps) {
  const { toast } = useToast();

  const handleStartBookClick = async () => {
    await actionUpdateBookStatus(status.id, ReadStatus.READING);
    onStatusChange();
    newBookSignal(true);
    toast({
      title: "Book started!",
      className: "bg-orange-500 text-white",
      duration: 5000,
    });
  };

  return (
    <div className="flex flex-row m-4 h-36 w-3/4 max-w-4xl hover:scale-105 shadow-lg shadow-sky-800 rounded-lg text-sky-800 bg-sky-100 hover:bg-sky-50 cursor-pointer transition duration-500">
      {book.smallCover && (
        <div className="flex justify-center items-center p-4">
          <BookNavigationWrapper id={book.googleBooksId}>
            <Image
              className="shadow-md shadow-sky-700 rounded hover:scale-105 transition duration-1000 w-full h-auto"
              src={book.smallCover}
              alt="cover"
              width="0"
              height="0"
              sizes="100vw"
            />
          </BookNavigationWrapper>
        </div>
      )}

      <div className="flex flex-col justify-center gap-1 p-1 flex-grow w-1/2">
        <Tooltip arrow title={book.title} placement="top">
          <p className="italic line-clamp-2">{book.title}</p>
        </Tooltip>
        <Tooltip arrow title={book.authors[0]} placement="bottom">
          <p className="text-slate-500">
            {book.authors && book.authors.length > 0
              ? book.authors[0]
              : "Author not available"}
          </p>
        </Tooltip>
      </div>

      <div className="flex justify-center items-center mr-2 w-1/4">
        <Button
          onClick={handleStartBookClick}
          className="rounded-full border-orange-500 border-2 hover:scale-110 transition duration-500"
        >
          Start
        </Button>
      </div>
    </div>
  );
}
