import Pagination from "@mui/material/Pagination";

type ParametrizedPaginationProps = {
  setPage: (page: number) => void;
  page: number;
  totalItems: number;
  numItemsPerPage: number;
};

export default function ParametrizedPagination({
  setPage,
  page,
  totalItems,
  numItemsPerPage
}: ParametrizedPaginationProps) {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const numberOfPages = Math.ceil(totalItems / numItemsPerPage);

  return (
    <Pagination
      className="flex justify-center mb-1"
      count={numberOfPages}
      page={page}
      onChange={handleChange}
      variant="outlined"
      sx={{
        "& .MuiPaginationItem-root": {
          color: "#ffffff" // Color del texto
        },
        "& .MuiPaginationItem-root.Mui-selected": {
          backgroundColor: "#F97316", // Fondo del elemento seleccionado
          color: "#ffffff" // Color del texto del elemento seleccionado
        },
        "& .MuiPaginationItem-root.Mui-disabled": {
          color: "#e5e7eb" // Color para el elemento deshabilitado (opcional)
        }
      }}
    />
  );
}
