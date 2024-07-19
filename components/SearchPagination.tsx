import Pagination from "@mui/material/Pagination";
import { useState } from "react";

type SearchPaginationProps = {
    setPage: (page: number) => void,
    page: number,
}

export default function SearchPagination({setPage, page}: SearchPaginationProps) {

    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Pagination className="flex justify-center" count={10} page={page} onChange={handleChange} />
    )
}