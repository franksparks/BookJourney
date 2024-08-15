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

export default function AddToList() {
  return (
    <div className="flex flex-row border-orange-500 border-2 rounded-lg justify-center w-fit items-center">
      <Button className="rounded-r-none">Want to read</Button>
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
