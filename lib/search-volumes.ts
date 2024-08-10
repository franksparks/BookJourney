import { VolumesResponse } from "@/models/google-books-response";

export const searchVolumes = async (
  search: string,
  index: number,
  maxResults: number
) => {
  const books = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=${maxResults}&startIndex=${index.toString()}`
  );
  return (await books.json()) as VolumesResponse;
};
