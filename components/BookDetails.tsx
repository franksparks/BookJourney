"use client";

import { actionInsertBook } from "@/actions/books";
import {
  actionDeleteRating,
  actionInsertRating,
  actionUpdateRating
} from "@/actions/ratings";
import { useDbUser } from "@/app/context/db-user-context";
import { Book, DbBook } from "@/models/book";
import { inverseRatingMap, Rating, ratingMap } from "@/models/rating";
import { RatingValue } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import BookToListInjector from "./BookToListInjector";
import ControlledRating from "./ControlledRating";
import ReadingStatusDropdown from "./ReadingStatusDropdown";
import ReadMore from "./ReadMore";
import ReadRating from "./ReadRating";
import ReviewDialogue from "./ReviewDialogue";
import { Separator } from "./ui/separator";
import Reviews from "./Reviews";
import { Review } from "@/models/review";

type BookDetailsProps = {
  book: Book | DbBook;
};

export default function BookDetails({ book }: BookDetailsProps) {
  const { dbUser } = useDbUser();
  const [numericBookRating, setNumericBookRating] = useState<number | null>(0);
  const [bookInDb, setBookInDb] = useState<DbBook | null>(null);
  const [bookRating, setBookRating] = useState<Rating | null>(null);
  const [bookReview, setBookReview] = useState<Review | null>(null);
  const [firstInteraction, setFirstInteraction] = useState(true);
  const logged = dbUser ? true : false;

  const fetchRating = useCallback(async () => {
    if (dbUser && "ratings" in book) {
      const ratings = (book as DbBook).ratings;

      if (ratings.length > 0) {
        const userRating: Rating[] = ratings.filter(
          (rating) => rating.userId === dbUser.id
        );

        if (
          Array.isArray(userRating) &&
          userRating.length > 0 &&
          userRating[0].rating !== undefined
        ) {
          const numericRating = ratingMap[userRating[0].rating];
          setNumericBookRating(numericRating);
          setBookRating(userRating[0]);
        }
      }
    }
  }, [book.googleBooksId, dbUser]);

  const fetchBookInDb = useCallback(async () => {
    if ("ratings" in book) {
      setBookInDb(book);
    }
  }, []);

  const addBookToDb = useCallback(async () => {
    const createdBook = await actionInsertBook(book as Book);
    setBookInDb(createdBook);
  }, [bookInDb]);

  const addRatingToBook = useCallback(async () => {
    const stringRating = inverseRatingMap[numericBookRating!];
    const ratingCreateInput = {
      rating: stringRating as RatingValue,
      book: {
        connect: {
          id: bookInDb?.id
        }
      },
      user: {
        connect: {
          id: dbUser.id
        }
      }
    };

    const rating = await actionInsertRating(ratingCreateInput);
    setBookRating(rating);
  }, [numericBookRating, bookInDb]);

  const updateRating = useCallback(async () => {
    const stringRating = inverseRatingMap[numericBookRating!];
    await actionUpdateRating(
      stringRating as RatingValue,
      bookRating?.id as string
    );
  }, [numericBookRating]);

  const deleteRating = useCallback(async () => {
    await actionDeleteRating(bookRating!.id!);
    setBookRating(null);
  }, [numericBookRating]);

  useEffect(() => {
    fetchRating();
    fetchBookInDb();
  }, [fetchRating]);

  useEffect(() => {
    if (!firstInteraction) {
      if (bookInDb === null) {
        addBookToDb();
      }
      if (bookRating === null) {
        addRatingToBook();
      } else {
        if (numericBookRating === null) {
          deleteRating();
        } else {
          updateRating();
        }
      }
    }
  }, [numericBookRating, bookInDb]);

  return (
    <div className="flex justify-center mt-10 ">
      <div className="flex justify-center basis-1/4">
        <div className="flex flex-col">
          <img className="mb-8" src={book.cover || "../default_cover.jpg"} />
          <div>
            <ReadingStatusDropdown book={book} logged={logged} />
          </div>
          <div className="flex justify-center mt-7">
            <ControlledRating
              logged={logged}
              bookRating={numericBookRating}
              setBookRating={setNumericBookRating}
              setFirstInteraction={setFirstInteraction}
            />
          </div>
          {!bookRating && (
            <div className="flex justify-center mt-2">{"Rate this book"}</div>
          )}
          {bookRating && (
            <div className="flex justify-center mt-2">
              <ReviewDialogue
                bookInDb={bookInDb!}
                dbUser={dbUser}
                numericBookRating={numericBookRating}
                setBookReview={setBookReview}
                bookReview={bookReview}
              />
            </div>
          )}
          <div className="flex justify-center mt-2">
            <BookToListInjector book={book} />
          </div>
        </div>
      </div>
      <div className="flex w-screen justify-start flex-col mr-4">
        <div className="flex flex-row">
          <h1 className="mr-4">{book.title}</h1>
          {logged && <ReadRating value={book.ratingAverage!} />}
        </div>
        {logged && (
          <h2>{`Average: ${book.ratingAverage} - Number of ratings: ${
            "ratings" in book ? book.ratings.length : ""
          }`}</h2>
        )}
        <Separator className="my-4" />
        {(book.authors &&
          book.authors.map((author: string, index: number) => (
            <h2 key={index}> {author} </h2>
          ))) || <h2> {"Unknown author"} </h2>}
        {book.description && <ReadMore text={book.description} />}
        {book.categories && (
          <>
            <div className="mt-8 mb-4 font-bold">{"Genres"}</div>
            <div className="flex h-5 items-center space-x-4">
              {book.categories.map((category: string, index: number) => (
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
        <>
          <Separator className="my-4" />
        </>
        <Reviews
          bookInDb={book}
          numericBookRating={numericBookRating}
          bookReview={bookReview}
        />
      </div>
    </div>
  );
}
