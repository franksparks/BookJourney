import Pagination from "@mui/material/Pagination";
import { useState } from "react";

export default function SearchPagination() {
    const [page, setPage] = useState(1);
    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };
    return (
        <Pagination count={10} page={page} onChange={handleChange} />
    )
}