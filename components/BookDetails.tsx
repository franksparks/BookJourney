import { Book } from "@/models/book";
import ReadMore from "./ReadMore";
import { Separator } from "./ui/separator";

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
                {book.description && <><Separator className="my-4" /><ReadMore text={book.description} /> <Separator className="my-4" /></>}
                {book.categories &&
                    <><div className="mt-4 mb-4 font-bold">{'Genres'}</div><div className="flex h-5 items-center space-x-4">
                        {book.categories.map((category, index) => (
                            <><Separator orientation="vertical" /><div key={index}>{category}</div><Separator orientation="vertical" /></>
                        ))}
                    </div></>}
            </div>
        </div>)
}