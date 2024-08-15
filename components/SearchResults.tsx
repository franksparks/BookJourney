import { capitalizeFirstLetter } from "@/lib/capitalize";
import { Book } from "@/models/book";
import BookNavigationWrapper from "./BookNavigationWrapper";
import ReadingStatusDropwdown from "./ReadingStatusDropdown";
import { Table, TableCell, TableRow } from "./ui/table";

type SearchResultProps = {
  books: Book[];
};
// Todo: Change the img for the next.js Image component
export default function SearchResult({ books }: SearchResultProps) {
  return (
    <Table className="mt-5 mb-5 flex justify-center">
      <div className="grid grid-cols-2 grid-rows-5 gap-4 mt-5">
        {books.map((book: Book, index: any) => (
          <TableRow key={index}>
            <div className="flex flex-row justify-between">
              <TableCell>
                <BookNavigationWrapper id={book.googleBooksId} key={index}>
                  <img
                    src={book.smallCover || "../default_cover.jpg"}
                    alt={`{book.title}cover`}
                    style={{ width: "75", height: "150px" }}
                  />
                </BookNavigationWrapper>
              </TableCell>
              <TableCell className="flex flex-col w-96">
                <b className="text-base">{`${capitalizeFirstLetter(
                  book.title
                )}`}</b>
                <div className="text-base">
                  by{" "}
                  {book.authors && book.authors.length > 0
                    ? capitalizeFirstLetter(book.authors.join(" "))
                    : "Unknown"}
                </div>
              </TableCell>
              <TableCell>
                <ReadingStatusDropwdown book={book} />
              </TableCell>
            </div>
          </TableRow>
        ))}
      </div>
    </Table>
  );
}
