import {
  actionGetBookStatusByBookIdAndUserId,
  actionInsertBookStatus,
  actionUpdateBookStatus,
} from "@/actions/book-status";
import {
  actionGetBookByGoogleId,
  actionInsertBook,
} from "@/actions/books";
import { useDbUser } from "@/app/context/db-user-context";
import { Book } from "@/models/book";
import { BookStatus } from "@/models/book-status";
import { ReadStatus } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

const menuItems = [
  { label: "Read", value: ReadStatus.READ },
  { label: "Currently reading", value: ReadStatus.READING },
  { label: "Want to read", value: ReadStatus.WANT_TO_READ },
];

type ReadingStatusDropwdownProps = {
  book: Book;
};

export default function ReadingStatusDropwdown({
  book,
}: ReadingStatusDropwdownProps) {
  const { dbUser } = useDbUser();
  const [currentStatus, setStatus] = useState<BookStatus | null>(null);

  useEffect(() => {
    if (dbUser && book) {
      getStatus();
    }
  }, [dbUser, book]);

  const getStatus = async () => {
    //Compruebo si el libro está en BBDD
    const dbBook = await actionGetBookByGoogleId(book.googleBooksId);

    if (dbUser != null && dbBook != null) {
      // Si el libro está en BBDD obtengo el estado de lectura
      // de este libro para este usuario
      console.log("El libro ESTÁ en BBDD");

      const readingStatus: BookStatus =
        await actionGetBookStatusByBookIdAndUserId(dbBook.id!, dbUser.id);

      if (readingStatus) {
        console.log("READING STATUS: " + readingStatus.status);
      }

      setStatus(readingStatus);
    } else {
      // Si el libro no está en BBDD, seteo status a null
      console.log("El libro no está en BBDD");
      setStatus(null);
    }
  };

  const handleDropdownClick = async (status: ReadStatus) => {
    const res = await actionInsertBook(book);

    if (!currentStatus) {
      //Si el usuario no tiene entrada para bookStatus, hago insert
      const newStatus = await actionInsertBookStatus(status, res, dbUser);
      setStatus(newStatus);
    } else {
      //Si el usuario TIENE entrada para bookStatus, hago update
      console.log("Update status here");

      const updatedStatus = await actionUpdateBookStatus(
        currentStatus.id,
        status
      );
      setStatus(updatedStatus);
    }

    getStatus();
  };

  const getSelectedLabel = () => {
    if (currentStatus) {
      const selectedItem = menuItems.find(
        (item) => item.value === currentStatus.status
      );
      return selectedItem?.label || "Select status";
    }
    return "Want to read";
  };

  const getDropdownItems = () => {
    if (currentStatus) {
      return menuItems.filter(
        (item) => item.value !== currentStatus.status
      );
    } else {
      return menuItems.filter(
        (item) => item.value !== ReadStatus.WANT_TO_READ
      );
    }
  };

  return (
    <>
      <div>
        <DropdownMenu>
          <Button
            onClick={() => {
              handleDropdownClick(ReadStatus.WANT_TO_READ);
            }}
            className={
              currentStatus
                ? "rounded-l-none bg-blue-300 text-black"
                : "rounded-l-none"
            }
          >
            {getSelectedLabel()}
          </Button>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-l-none">&#9660;</Button>
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
