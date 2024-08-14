import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { actionInsertBook } from "@/actions/books";
import { Book } from "@/models/book";
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";

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
  const handleDropdownClick = async () => {
    await actionInsertBook(book);
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
