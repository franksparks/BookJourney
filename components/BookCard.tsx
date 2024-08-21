import { actionUpdateBookStatus } from "@/actions/book-status";
import { Book } from "@/models/book";
import { BookStatus } from "@/models/book-status";
import { ReadStatus } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Tooltip } from "@mui/material";
import BookNavigationWrapper from "./BookNavigationWrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useDbUser } from "@/app/context/db-user-context";
import { useState } from "react";
import { actionInsertReadingActivity } from "@/actions/reading-activity";

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
  const { dbUser } = useDbUser();
  const [readingProgress, setReadingProgress] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDoneClick = async () => {
    await actionUpdateBookStatus(status.id, ReadStatus.READ);
    onStatusChange();
  };

  const handleAddReadingActivity = async () => {
    if (
      isNaN(Number(readingProgress)) ||
      Number(readingProgress) < 0 ||
      Number(readingProgress) > 100
    ) {
      alert("Please enter a valid percentage between 0 and 100.");
      return;
    }
    await actionInsertReadingActivity(
      readingProgress,
      book.id!,
      dbUser.id
    );
    setIsDialogOpen(false); // Cerrar el modal
  };

  return (
    <div className="flex flex-row m-4 h-36 w-96 hover:scale-105 shadow-lg shadow-sky-800 rounded-lg text-sky-800 bg-sky-100 hover:bg-sky-50 cursor-pointer transition duration-500">
      {book.smallCover && (
        <div className="flex justify-center items-center p-4">
          <BookNavigationWrapper id={book.googleBooksId}>
            <Image
              className="shadow-md shadow-sky-700 rounded hover:scale-105 transition duration-1000"
              src={book.smallCover}
              alt="cover"
              width={60}
              height={100}
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

      <div className="flex flex-col *:justify-center items-center p-4">
        {/* To do: Display current progress of the book*/}
        <p>Progress bar</p>
        <div className="flex flex-col justify-center items-center p-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full border-orange-400 border-2">
                Update progress
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update progress</DialogTitle>
                <DialogDescription>
                  Add reading activity for the book.
                </DialogDescription>
              </DialogHeader>
              <div>
                <div className=" items-center gap-4">
                  <p>Current reading percentage:</p>
                </div>
                <Input
                  id="value"
                  className="col-span-3"
                  value={readingProgress}
                  onChange={(e) => setReadingProgress(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button
                  onClick={handleAddReadingActivity}
                  className="rounded-full border-orange-400 border-2"
                >
                  Save activity
                </Button>
                <Button
                  onClick={handleDoneClick}
                  className="rounded-full border-orange-400 border-2"
                >
                  Book Finished!
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
