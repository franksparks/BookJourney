import {
  actionGetBookStatusByBookIdAndUserId,
  actionInsertBookStatus,
  actionUpdateBookStatus,
} from "@/actions/book-status";
import {
  actionGetBookByGoogleId,
  actionInsertBook,
} from "@/actions/books";
import { actionInsertReadingActivityPercentage } from "@/actions/reading-activity";
import { useDbUser } from "@/app/context/db-user-context";
import { menuItems } from "@/lib/utils";
import { Book, DbBook } from "@/models/book";
import { BookStatus } from "@/models/book-status";
import { ReadStatus } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useToast } from "./ui/use-toast";
import { Tooltip } from "@mui/material";
import { usePathname } from "next/navigation";

type ReadingStatusDropdownProps = {
  book: Book | DbBook;
  handleStatusChange: () => void;
  logged: boolean;
};

export default function ReadingStatusDropdown({
  book,
  handleStatusChange,
  logged,
}: ReadingStatusDropdownProps) {
  const pathname = usePathname();
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
      const readingStatus: BookStatus | null = output[0] || null;
      setStatus(readingStatus);
    } else {
      setLoading(true);
      const dbBook = await actionGetBookByGoogleId(book.googleBooksId);

      if (dbUser != null && dbBook != null) {
        const readingStatus: BookStatus =
          await actionGetBookStatusByBookIdAndUserId(
            dbBook.id!,
            dbUser.id
          );

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
      const newStatus = await actionInsertBookStatus(status, res, dbUser);
      setStatus(newStatus);
      if (status === ReadStatus.READ) {
        await actionInsertReadingActivityPercentage(
          100,
          res.id!,
          dbUser.id
        );
      }
      toast({
        title: "Book status stored correctly!",
        className: "bg-orange-500 text-white",
        duration: 5000,
      });
    } else {
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
        duration: 5000,
      });
    }
    handleStatusChange();
  };

  const getSelectedLabel = () => {
    if (currentStatus) {
      const selectedItem = menuItems.find(
        (item: any) => item.value === currentStatus.status
      );
      return selectedItem?.label;
    }
    return "Want to read";
  };

  const getDropdownItems = () => {
    if (currentStatus) {
      return menuItems.filter(
        (item: any) => item.value !== currentStatus.status
      );
    } else {
      return menuItems.filter(
        (item: any) => item.value !== ReadStatus.WANT_TO_READ
      );
    }
  };

  if (loading) {
    return <Skeleton className="h-10 w-1/2" />;
  }

  return (
    <>
      <div className="w-full">
        <DropdownMenu>
          {dbUser === null ? (
            <Tooltip title="Login to perform this action." arrow>
              <span>
                <Button
                  className="rounded-r-none"
                  disabled={!logged}
                  variant={"dropdown"}
                >
                  {getSelectedLabel()}
                </Button>
              </span>
            </Tooltip>
          ) : (
            <Button
              disabled={!logged}
              variant={"dropdown"}
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
          )}

          {dbUser === null ? (
            <Tooltip title="Login to perform this action." arrow>
              <span>
                <Button
                  variant={"dropdown"}
                  className="rounded-l-none"
                  disabled={!logged}
                >
                  {" "}
                  &#9660;
                </Button>
              </span>
            </Tooltip>
          ) : (
            <>
              {" "}
              <DropdownMenuTrigger asChild>
                <Button
                  disabled={!logged}
                  className="rounded-l-none"
                  variant={"dropdown"}
                >
                  &#9660;
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col">
                {getDropdownItems().map((item: any, index: number) => (
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
            </>
          )}
        </DropdownMenu>
      </div>
    </>
  );
}
