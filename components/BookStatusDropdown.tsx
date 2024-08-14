import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";

const menuItems = [
  { label: "Read", value: "read" },
  { label: "Currently reading", value: "currently-reading" },
  { label: "Want to read", value: "want-to-read" },
];

export default function BookStatusDropdown() {
  return (
    <div className="border-orange-500 border-2 rounded-lg ">
      <Button className="rounded-r-none ">Want to read</Button>
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
    </div>
  );
}
