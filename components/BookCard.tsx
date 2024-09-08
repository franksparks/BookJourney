import { actionUpdateBookStatus } from "@/actions/book-status";
import {
  actionGetLatestReadingActivityByBookIdAndUserId,
  actionInsertReadingActivityPage,
  actionInsertReadingActivityPercentage,
} from "@/actions/reading-activity";
import { useDbUser } from "@/app/context/db-user-context";
import { validateProgressInput } from "@/lib/reading-progress-validator";
import { Book } from "@/models/book";
import { BookStatus } from "@/models/book-status";
import { Tooltip } from "@mui/material";
import { ReadingActivity, ReadStatus } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import BookNavigationWrapper from "./BookNavigationWrapper";
import { Button } from "./ui/button";
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
import { useToast } from "./ui/use-toast";

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
  const [readingProgress, setReadingProgress] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentReadingActivity, setCurrentReadingActivity] =
    useState<ReadingActivity | null>(null);
  const [progressType, setProgressType] = useState("pages");
  const { toast } = useToast();

  const setReadingActivity = async () => {
    const activity: ReadingActivity =
      await actionGetLatestReadingActivityByBookIdAndUserId(
        book.id!,
        dbUser.id
      );
    setCurrentReadingActivity(activity);
  };
  useEffect(() => {
    setReadingActivity();
  }, [book.id, dbUser.id]);

  const handleDoneClick = async () => {
    await actionUpdateBookStatus(status.id, ReadStatus.READ);
    await actionInsertReadingActivityPercentage(100, book.id!, dbUser.id);
    onStatusChange();
    toast({
      title: "Book read! Well done!",
      className: "bg-orange-500 text-white",
      duration: 5000,
    });
  };

  const handleAddReadingActivity = async () => {
    if (!validateProgressInput(book, progressType, readingProgress)) {
      return;
    }
    if (progressType === "pages") {
      await actionInsertReadingActivityPage(
        readingProgress,
        book.id!,
        dbUser.id
      );
      if (readingProgress === book.pages) {
        await actionUpdateBookStatus(status.id, ReadStatus.READ);
        await actionInsertReadingActivityPercentage(100, book.id!, dbUser.id);
        onStatusChange();
      }
    } else {
      await actionInsertReadingActivityPercentage(
        readingProgress,
        book.id!,
        dbUser.id
      );
      if (readingProgress === 100) {
        await actionUpdateBookStatus(status.id, ReadStatus.READ);
        await actionInsertReadingActivityPercentage(100, book.id!, dbUser.id);
        onStatusChange();
      }
    }
    setReadingActivity();

    setIsDialogOpen(false);

    toast({
      title: "Reading activity stored correctly. ",
      className: "bg-orange-500 text-white",
      duration: 5000,
    });
  };
  const handleStopReading = async () => {
    await actionUpdateBookStatus(status.id, ReadStatus.WANT_TO_READ);
    onStatusChange();
    toast({
      title: "Book moved back to 'Want to read'!",
      className: "bg-orange-500 text-white",
      duration: 5000,
    });
  };

  return (
    <div className="flex flex-row m-4 h-36 w-11/12 max-w-4xl hover:scale-105 shadow-lg shadow-sky-800 rounded-lg text-sky-800 bg-sky-100 hover:bg-sky-50 cursor-default transition duration-500 ">
      <div className="flex justify-center items-center p-4 w-1/4">
        <BookNavigationWrapper id={book.googleBooksId}>
          {book.smallCover != null ? (
            <Image
              className="shadow-md shadow-sky-700 rounded hover:scale-105 transition duration-1000 w-16 h-auto"
              src={book.smallCover}
              alt="cover"
              width="0"
              height="0"
              sizes="100vw"
              priority={false}
            />
          ) : (
            <Image
              className="shadow-md shadow-sky-700 rounded hover:scale-105 transition duration-1000"
              src={"/default_cover.jpg"}
              alt="cover"
              width={60}
              height={100}
            />
          )}
        </BookNavigationWrapper>
      </div>

      <div className="flex flex-col justify-center gap-1 p-1 flex-grow w-1/2">
        <Tooltip arrow title={book.title} placement="top">
          <div>
            <BookNavigationWrapper id={book.googleBooksId}>
              <p className="italic line-clamp-2">{book.title}</p>
            </BookNavigationWrapper>
          </div>
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
        <div>
          {currentReadingActivity === undefined ||
          currentReadingActivity === null ? (
            <p>0/{book.pages}</p>
          ) : currentReadingActivity.page === null ? (
            <>
              <p>{currentReadingActivity.percentage}%</p>
              <div className="w-36 bg-gray-200 rounded-full h-4 border-2 border-gray-300">
                <div
                  className="bg-orange-500 h-3 rounded-full"
                  style={{
                    width: `${currentReadingActivity?.percentage || 0}%`,
                  }}
                ></div>
              </div>
            </>
          ) : (
            <>
              <p>
                {currentReadingActivity.page}/{book.pages} (
                {((currentReadingActivity.page / book.pages) * 100).toFixed(1)}
                %)
              </p>
              <div className="w-36 bg-gray-200 rounded-full h-4 border-2 border-gray-300">
                <div
                  className=" bg-orange-500 h-3 rounded-full"
                  style={{
                    width: `${
                      (currentReadingActivity.page / book.pages) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col justify-center items-center p-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full border-orange-500 border-2">
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
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    id="pages"
                    name="progressType"
                    value="pages"
                    checked={progressType === "pages"}
                    onChange={() => setProgressType("pages")}
                  />
                  <label htmlFor="pages">Pages</label>

                  <input
                    type="radio"
                    id="percentage"
                    name="progressType"
                    value="percentage"
                    checked={progressType === "percentage"}
                    onChange={() => setProgressType("percentage")}
                  />
                  <label htmlFor="percentage">Percentage</label>
                </div>

                <div className="items-center gap-4 mt-4">
                  {currentReadingActivity ? (
                    currentReadingActivity.page !== null ? (
                      <>
                        Currently read {currentReadingActivity.page}/
                        {book.pages} pages (
                        {(
                          (currentReadingActivity.page / book.pages) *
                          100
                        ).toFixed(1)}
                        %)
                      </>
                    ) : currentReadingActivity.percentage !== null ? (
                      <>Currently read {currentReadingActivity.percentage}%</>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  <p>
                    {progressType === "pages" ? "Pages " : "Percentage "}
                    read:
                  </p>
                  <Input
                    id="value"
                    className="col-span-3"
                    value={readingProgress}
                    onChange={(e) => setReadingProgress(Number(e.target.value))}
                    step="any"
                  />
                </div>
              </div>
              <DialogFooter>
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={handleAddReadingActivity}
                    className="rounded-full border-orange-500 border-2"
                  >
                    Save activity
                  </Button>

                  <Button
                    onClick={() => {
                      handleDoneClick();
                      setIsDialogOpen(false);
                    }}
                    className="rounded-full border-orange-500 border-2 "
                  >
                    Book Finished!
                  </Button>
                  <Button
                    className="rounded-full border-orange-500 bg-red-400 hover:bg-red-600 border-2"
                    onClick={handleStopReading}
                  >
                    Stop reading
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
