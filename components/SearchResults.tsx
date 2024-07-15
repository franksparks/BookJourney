import { Book } from "@/actions/search-books";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";

type SearchResultProps = {
    results: (Book[]);
}

export default function SearchResult({ results }: SearchResultProps) {
    return (
        <Table className="mt-5">
            <TableBody>
                {results.map((result, index) => (
                    <TableRow key={index}>
                        <TableCell >{result.title}</TableCell>
                        <TableCell> {result.authors}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}