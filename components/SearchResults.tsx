import { Table, TableCell, TableRow } from "./ui/table";
import { capitalizeFirstLetter } from "@/lib/capitalize";
import AddToList from "./AddToList";
import { Book } from "@/models/book";
import BookNavigationWrapper from "./BookNavigationWrapper";

type SearchResultProps = {
  results: Book[];
};
// Todo: Change the img for the next.js Image component
export default function SearchResult({ results }: SearchResultProps) {
  return (
    <Table className="mt-5 mb-5 flex justify-center">
      <div className="grid grid-cols-2 grid-rows-5 gap-4 mt-5">
        {results.map((result: Book, index) => (
          <TableRow key={index}>
            <BookNavigationWrapper id={result.googleBooksId} key={index}>
              <div className="flex flex-row justify-between">
                <TableCell>
                  <img
                    src={result.smallCover || "../default_cover.jpg"}
                    alt={`{result.title}cover`}
                    style={{ width: "75", height: "150px" }}
                  />
                </TableCell>
                <TableCell className="flex flex-col w-96">
                  <b className="text-base">{`${capitalizeFirstLetter(
                    result.title
                  )}`}</b>
                  <div className="text-base">
                    by{" "}
                    {result.authors && result.authors.length > 0
                      ? capitalizeFirstLetter(result.authors.join(" "))
                      : "Unknown"}
                  </div>
                </TableCell>
                <TableCell>
                  <AddToList />
                </TableCell>
              </div>
            </BookNavigationWrapper>
          </TableRow>
        ))}
      </div>
    </Table>
  );
}
