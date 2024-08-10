import { Book } from "@/models/book";

type bookCardProps = {
  book: Book;
};

export default function BookCard({ book }: bookCardProps) {
  console.log(book);
  return (
    <div className="flex flex-row m-2 w-64 hover:outline hover:scale-110 shadow-xl">
      <div className="m-4 flex flex-col justify-around">
        <p className="italic">{book.title}</p>
        {book.authors && book.authors.length > 0
          ? book.authors[0]
          : "Author not available"}
      </div>
    </div>
  );
}
