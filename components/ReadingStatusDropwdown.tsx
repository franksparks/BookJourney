import {
  actionGetBookStatusByBookIdAndUserId,
  actionInsertBookStatus,
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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const menuItems = [
  { label: "Read", value: "read" },
  { label: "Currently reading", value: "currently-reading" },
  { label: "Want to read", value: "want-to-read" },
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
      // Si el libro está en BBDD invoco el estado de lectura para este user
      console.log("El libro ESTÁ en BBDD");

      const readingStatus: BookStatus =
        await actionGetBookStatusByBookIdAndUserId(dbBook.id!, dbUser.id);

      console.log("READING STATUS: " + readingStatus.status);
      setStatus(readingStatus);
    } else {
      // Si el libro no está en BBDD, seteo status a null
      console.log("El libro no está en BBDD");
      setStatus(null);
    }
  };

  const handleDropdownClick = async () => {
    const res = await actionInsertBook(book);
    const newStatus = await actionInsertBookStatus(
      ReadStatus.WANT_TO_READ,
      res,
      dbUser
    );
    setStatus(newStatus);
    getStatus();
  };

  return (
    <>
      <p>{currentStatus?.status}</p>
      <Button onClick={handleDropdownClick} className="rounded-r-none">
        Want to read
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-l-none">&#9660;</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {menuItems.map((item, index) => (
            <DropdownMenuCheckboxItem key={index}>
              {item.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
