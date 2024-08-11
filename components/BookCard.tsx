import { Book } from "@/models/book";

type bookCardProps = {
  book: Book;
};

export default function BookCard({ book }: bookCardProps) {
  console.log(book);
  return (
    <div className="flex flex-row m-4 w-64 hover:scale-105 shadow shadow-white rounded-lg  hover:bg-slate-50 hover:text-sky-700 transition duration-500">
      <div className="m-4 flex flex-col justify-around">
        <p className="italic">{book.title}</p>
        <p>
          {book.authors && book.authors.length > 0
            ? book.authors[0]
            : "Author not available"}
        </p>
      </div>
    </div>
  );
}
