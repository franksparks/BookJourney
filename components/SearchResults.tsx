import { Book } from "@/actions/search-books";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { capitalizeFirstLetter } from "@/lib/capitalize";

type SearchResultProps = {
    results: (Book[]);
}

// Todo: Change the img for the next.js Image component
export default function SearchResult({ results }: SearchResultProps) {
    return (
        <Table className="mt-5 flex justify-center">
            <TableBody>
                {results.map((result, index) => (

                    <TableRow key={index}>
                        <>{result.smallThumbnail && <TableCell><img src={result.smallThumbnail} /></TableCell>}
                        </>
                        <TableCell>{capitalizeFirstLetter(result.title)}</TableCell>
                        <TableCell>
                            {result.authors && (
                                capitalizeFirstLetter(result.authors.join(" "))
                            )}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}