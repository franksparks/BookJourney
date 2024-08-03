
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";

export default function AddToList() {
    {
        return (
            <><Button className="rounded-r-none">Want to read</Button><DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="rounded-l-none">&#9660;</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuCheckboxItem
                    >
                        Read
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                        Currently reading
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                        Want to read
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu></>
        )
    }
}