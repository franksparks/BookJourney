import { actionInsertBookStatus } from "@/actions/book-status";
import { actionInsertBook } from "@/actions/books";
import { useDbUser } from "@/app/context/db-user-context";
import { Book } from "@/models/book";
import { ReadStatus } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
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

  const handleDropdownClick = async () => {
    const res = await actionInsertBook(book);

    await actionInsertBookStatus(ReadStatus.WANT_TO_READ, res, dbUser);
  };

  return (
    <>
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
