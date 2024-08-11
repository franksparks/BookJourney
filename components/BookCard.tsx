import { actionUpdateBookStatus } from "@/actions/book-status";
import { Book } from "@/models/book";
import { BookStatus } from "@/models/book-status";
import { ReadStatus } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";

type bookCardProps = {
  book: Book;
  status: BookStatus;
  onStatusChange: () => void;
};

export default function BookCard({
  book,
  status,
  onStatusChange,
}: bookCardProps) {
  const handleDoneClick = async () => {
    await actionUpdateBookStatus(status.id, ReadStatus.READ);
    onStatusChange();
  };

  return (
    <div className="flex flex-row m-4 w-96 hover:scale-105 shadow border border-white shadow-white rounded-lg hover:bg-slate-50 hover:text-sky-700 bg-sky-600 cursor-pointer transition duration-500 ">
      {book.smallCover && (
        <div className="flex justify-center items-center p-4">
          <Image
            className="shadow-md shadow-white rounded"
            src={book.smallCover}
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
        <Button
          onClick={handleDoneClick}
          className="rounded-full border-orange-400 border-2"
        >
          Done
        </Button>
      </div>
    </div>
  );
}
