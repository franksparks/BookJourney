import {
  actionGetBookStatusByBookIdAndUserId,
  actionInsertBookStatus,
  actionUpdateBookStatus
} from "@/actions/book-status";
import { actionGetBookByGoogleId, actionInsertBook } from "@/actions/books";
import { actionInsertReadingActivityPercentage } from "@/actions/reading-activity";
import { useDbUser } from "@/app/context/db-user-context";
import { Book, DbBook } from "@/models/book";
import { BookStatus } from "@/models/book-status";
import { ReadStatus } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useToast } from "./ui/use-toast";

const menuItems = [
  { label: "Read", value: ReadStatus.READ },
  { label: "Currently reading", value: ReadStatus.READING },
  { label: "Want to read", value: ReadStatus.WANT_TO_READ }
];

type ReadingStatusDropwdownProps = {
  book: Book | DbBook;
  logged: boolean;
};

export default function ReadingStatusDropwdown({
  book,
  logged
}: ReadingStatusDropwdownProps) {
  const { dbUser } = useDbUser();
  const [currentStatus, setStatus] = useState<BookStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    getStatus();
  }, [dbUser, book]);

  const getStatus = async () => {
    if (dbUser != null && (book as DbBook).bookStatuses !== undefined) {
      const output = (book as DbBook).bookStatuses.filter(
        (status) => status.userId === dbUser.id
      );
      const readingStatus: BookStatus = output[0];
      setStatus(readingStatus);
    } else {
      setLoading(true);
      const dbBook = await actionGetBookByGoogleId(book.googleBooksId);

      if (dbUser != null && dbBook != null) {
        // obtain the bookStatus if the book is on DB.

        const readingStatus: BookStatus =
          await actionGetBookStatusByBookIdAndUserId(dbBook.id!, dbUser.id);

        setStatus(readingStatus);
      } else {
        setStatus(null);
      }
      setLoading(false);
    }
  };

  const handleDropdownClick = async (status: ReadStatus) => {
    const existing = await actionGetBookByGoogleId(book.googleBooksId);
    let res;
    if (!existing) {
      res = await actionInsertBook(book as Book);
    } else {
      res = existing;
    }

    if (!currentStatus) {
      //If bookStatus does no exist, call to insert action
      const newStatus = await actionInsertBookStatus(status, res, dbUser);
      setStatus(newStatus);
      if (status === ReadStatus.READ) {
        await actionInsertReadingActivityPercentage(100, res.id!, dbUser.id);
      }
      toast({
        title: "Book status stored correctly!",
        className: "bg-orange-500 text-white",
        duration: 5000
      });
    } else {
      //If bookStatus exists, call to update action
      const updatedStatus = await actionUpdateBookStatus(
        currentStatus.id,
        status
      );
      setStatus(updatedStatus);
      if (status === ReadStatus.READ) {
        await actionInsertReadingActivityPercentage(
          100,
          existing.id!,
          dbUser.id
        );
      }
      toast({
        title: "Book status updated correctly!",
        className: "bg-orange-500 text-white",
        duration: 5000
      });
    }
  };

  const getSelectedLabel = () => {
    if (currentStatus) {
      const selectedItem = menuItems.find(
        (item) => item.value === currentStatus.status
      );
      return selectedItem?.label;
    }
    return "Want to read";
  };

  const getDropdownItems = () => {
    if (currentStatus) {
      return menuItems.filter((item) => item.value !== currentStatus.status);
    } else {
      return menuItems.filter((item) => item.value !== ReadStatus.WANT_TO_READ);
    }
  };

  if (loading) {
    return <Skeleton className="h-10 w-1/2" />;
  }

  return (
    <>
      <div className="w-full">
        <DropdownMenu>
          <Button
            disabled={!logged}
            onClick={() => {
              if (getSelectedLabel() === "Want to read")
                handleDropdownClick(ReadStatus.WANT_TO_READ);
            }}
            className={
              currentStatus
                ? "rounded-r-none bg-blue-300 hover:bg-blue-300 text-black cursor-not-allowed"
                : "rounded-r-none"
            }
          >
            {getSelectedLabel()}
          </Button>
          <DropdownMenuTrigger asChild>
            <Button disabled={!logged} className="rounded-l-none">
              &#9660;
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col">
            {getDropdownItems().map((item, index) => (
              <DropdownMenuItem
                key={index}
                className={
                  index === 0 && String(currentStatus) === item.value
                    ? "rounded-l-none bg-blue-200"
                    : "rounded-l-none"
                }
                onClick={() => {
                  handleDropdownClick(item.value);
                }}
              >
                <Button>{item.label}</Button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
