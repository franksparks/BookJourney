"use client";

import { Book } from "@/models/book";
import ReadMore from "./ReadMore";
import { Separator } from "./ui/separator";
import ControlledRating from "./ControlledRating";
import ReadRating from "./ReadRating";
import { useDbUser } from "@/app/context/db-user-context";
import { useCallback, useEffect, useState } from "react";
import ReadingStatusDropdown from "./ReadingStatusDropdown";
import { actionGetRatingByGoogleBookIdAndUserId } from "@/actions/ratings";
import { Rating, ratingMap } from "@/models/rating";

type BookDetailsProps = {
  book: Book;
};

export default function BookDetails({ book }: BookDetailsProps) {
  const { dbUser } = useDbUser();
  const [bookRating, setBookRating] = useState<number | null>(0);
  const logged = dbUser ? true : false;

  const fetchRating = useCallback(async () => {
    const rating: Rating = await actionGetRatingByGoogleBookIdAndUserId(
      book.googleBooksId,
      dbUser.id
    );
    const numericRating = ratingMap[rating.rating];
    setBookRating(numericRating);
  }, [book.googleBooksId]);

  useEffect(() => {
    fetchRating();
  }, [fetchRating]);

  return (
    <div className="flex justify-center mt-10">
      <div className="flex justify-center basis-1/4">
        <div className="flex flex-col">
          <img className="mb-8" src={book.cover || "../default_cover.jpg"} />
          <div>
            <ReadingStatusDropdown book={book} logged={logged} />
          </div>
          <div className="flex justify-center mt-7">
            <ControlledRating
              logged={logged}
              bookRating={bookRating}
              setBookRating={setBookRating}
            />
          </div>
          <div className="flex justify-center mt-2">{"Rate this book"}</div>
        </div>
      </div>
      <div className="flex w-screen justify-start flex-col mr-4">
        <h1>{book.title}</h1>
        <div className="flex flex-row">
          <ReadRating value={5} />
        </div>
        <Separator className="my-4" />
        {(book.authors &&
          book.authors.map((author, index) => (
            <h2 key={index}> {author} </h2>
          ))) || <h2> {"Unknown author"} </h2>}
        {book.description && <ReadMore text={book.description} />}
        {book.categories && (
          <>
            <div className="mt-8 mb-4 font-bold">{"Genres"}</div>
            <div className="flex h-5 items-center space-x-4">
              {book.categories.map((category, index) => (
                <>
                  <Separator orientation="vertical" />
                  <div key={index}>{category}</div>
                  <Separator orientation="vertical" />
                </>
              ))}
            </div>
          </>
        )}
        {
          <>
            <div className="mt-8 font-bold">{"This edition"}</div>
            <Separator className="my-4" />
          </>
        }
        <div className="grid gap-4">
          {book.pages !== 0 && (
            <div className="flex items-center">
              <div className="font-semibold">Pages</div>
              <div className="ml-11">{book.pages}</div>
            </div>
          )}
          {book.language && (
            <div className="flex items-center">
              <div className="font-semibold">Published</div>
              <div className="ml-4">{book.publishedDate}</div>
            </div>
          )}
          {book.language && (
            <div className="flex items-center">
              <div className="font-semibold">Language</div>
              <div className="ml-4">{book.language.toUpperCase()}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
