import Pagination from "@mui/material/Pagination";

type SearchPaginationProps = {
    setPage: (page: number) => void,
    page: number,
    totalItems: number,
}

export default function SearchPagination({ setPage, page, totalItems }: SearchPaginationProps) {
    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const numberOfPages = Math.ceil(totalItems/10);
    
    return (
        <Pagination className="flex justify-center" count={numberOfPages} page={page} onChange={handleChange} />
    )
}