import { Book } from "@/models/book";
import ReadMore from "./ReadMore";

type BookDetailsProps = {
    book: Book;
};

export default function BookDetails({ book }: BookDetailsProps) {
    return (
        <div className="flex justify-center w-screen mt-10">
            <div className="flex w-screen justify-center basis-1/4">
                <img src={book.cover || "../default_cover.jpg"} />
            </div>
            <div className="flex w-screen justify-start flex-col">
                <h1>{book.title}</h1>
                {book.authors && book.authors.map((author, index) => (<h2 key={index}> {author} </h2>)) || (<h2> {'Unknown author'} </h2>)}
                {book.description && <ReadMore text={book.description}/>}
            </div>
        </div>)
}