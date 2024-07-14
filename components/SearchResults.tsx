import { Book } from "@/actions/search-books";

type SearchResultProps = {
    results: (Book[]);
}

export default function SearchResult({ results }: SearchResultProps) {
    console.log(typeof (results))
    return (
        <div className="mt-2.5 ml-2.5">
            {results.map((result, index) => (
                <div className="flex flex-row">
                    <div key={index}>{result.title}</div>
                    <div className="ml-2.5">/</div>
                    <div className="ml-2.5" key={index}>{result.authors}</div>
                </div>
            ))}
        </div>
    );
}