import { capitalizeFirstLetter } from "@/lib/capitalize";
import { Book } from "@/models/book";
import { Key } from "react";
import ReadingStatusDropwdown from "./ReadingStatusDropwdown";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";

type SearchResultProps = {
  books: Book[];
};
// Todo: Change the img for the next.js Image component
export default function SearchResult({ books }: SearchResultProps) {
  return (
    <Table className="mt-5 flex justify-center">
      <TableBody>
        {books.map((book: Book, index: Key) => (
          <TableRow className="items-center w-3/4" key={index}>
            <TableCell>
              <img
                src={book.cover || "../default_cover.jpg"}
                alt={`{book.title}cover`}
                style={{ width: "125px", height: "200px" }}
              />
            </TableCell>
            <TableCell>
              <b className="text-base">
                {capitalizeFirstLetter(book.title)}
              </b>
              <br />
              by{" "}
              {book.authors && book.authors.length > 0
                ? capitalizeFirstLetter(book.authors.join(" "))
                : "Unknown"}
            </TableCell>
            <TableCell>
              <ReadingStatusDropwdown book={book} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
