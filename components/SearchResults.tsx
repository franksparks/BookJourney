import { Book } from "@/actions/search-books";

type SearchResultProps = {
    results: (Book[]);
}

export default function SearchResult({ results }: SearchResultProps) {
    return (
        <div className="mt-2.5 ml-2.5">
            {results.map((result, index) => (
                <div className="flex flex-row" key={index}>
                    <div >{result.title}</div>
                    <div className="ml-2.5">/</div>
                    <div className="ml-2.5">{result.authors}</div>
                </div>
            ))}
        </div>
    );
}