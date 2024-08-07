import { Book } from "@/actions/search-books";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { capitalizeFirstLetter } from "@/lib/capitalize";
import AddToList from './AddToList';

type SearchResultProps = {
    results: (Book[]);
}

// Todo: Change the img for the next.js Image component
export default function SearchResult({ results }: SearchResultProps) {
    return (
        <Table className="mt-5 flex justify-center">
            <TableBody>
                {results.map((result, index) => (
                    <TableRow className="items-center w-3/4" key={index}>
                        <TableCell><img src={result.smallThumbnail || "../default_cover.jpg"} alt={`{result.title}cover`} style={{ width: '125px', height: '200px' }} /></TableCell>
                        <TableCell><b className="text-base">{capitalizeFirstLetter(result.title)}</b><br />by {result.authors && result.authors.length > 0
                            ? capitalizeFirstLetter(result.authors.join(" "))
                            : "Unknown"}
                        </TableCell>
                        <TableCell><AddToList /></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}