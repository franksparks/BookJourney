"use client";

import {
  actionGetBookByGoogleId,
  actionInsertBook,
} from "@/actions/books";
import {
  actionDeleteRating,
  actionGetAverageRatingByBookId,
  actionGetRatingByGoogleBookIdAndUserId,
  actionGetRatingsByBook,
  actionInsertRating,
  actionUpdateRating,
} from "@/actions/ratings";
import { useDbUser } from "@/app/context/db-user-context";
import { Book } from "@/models/book";
import { inverseRatingMap, Rating, ratingMap } from "@/models/rating";
import { RatingValue } from "@prisma/client";
import ReviewDialogue from "./ReviewDialogue";
import { useCallback, useEffect, useState } from "react";
import ControlledRating from "./ControlledRating";
import ReadingStatusDropdown from "./ReadingStatusDropdown";
import ReadMore from "./ReadMore";
import ReadRating from "./ReadRating";
import { Separator } from "./ui/separator";
import Reviews from "./Reviews";
import { Review } from "@/models/review";


type BookDetailsProps = {
  book: Book;
};

export default function BookDetails({ book }: BookDetailsProps) {
  const { dbUser } = useDbUser();
  const [numericBookRating, setNumericBookRating] = useState<
    number | null
  >(0);
  const [averageBookRating, setAverageBookRating] = useState<number>(0);
  const [numberOfRatings, setNumberOfRatings] = useState<number>(0);
  const [bookInDb, setBookInDb] = useState<Book | null>(null);
  const [bookRating, setBookRating] = useState<Rating | null>(null);
  const [bookReview, setBookReview] = useState<Review | null>(null);
  const [firstInteraction, setFirstInteraction] = useState(true);
  const logged = dbUser ? true : false;

  const fetchRating = useCallback(async () => {
    if (dbUser) {
      const rating: Rating = await actionGetRatingByGoogleBookIdAndUserId(
        book.googleBooksId,
        dbUser.id
      );
      if (rating) {
        setBookRating(rating);
        const numericRating = ratingMap[rating.rating];
        setNumericBookRating(numericRating);
      }
    }
  }, [book.googleBooksId, dbUser]);

  const fetchAverageRating = useCallback(async () => {
    if (bookInDb) {
      const average = await actionGetAverageRatingByBookId(bookInDb.id!);
      setAverageBookRating(average);

      const ratings = await actionGetRatingsByBook(bookInDb.id!);
      setNumberOfRatings(ratings.length);
    }
  }, [bookInDb?.id!]);

  const fetchBookInDb = useCallback(async () => {
    const dbBook: Book = await actionGetBookByGoogleId(book.googleBooksId);
    setBookInDb(dbBook);
  }, []);

  const addBookToDb = useCallback(async () => {
    const createdBook = await actionInsertBook(book);
    setBookInDb(createdBook);
  }, [bookInDb]);

  const addRatingToBook = useCallback(async () => {
    const stringRating = inverseRatingMap[numericBookRating!];
    const ratingCreateInput = {
      rating: stringRating as RatingValue,
      book: {
        connect: {
          id: bookInDb?.id,
        },
      },
      user: {
        connect: {
          id: dbUser.id,
        },
      },
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
    fetchAverageRating();
  }, [fetchRating, fetchBookInDb, fetchAverageRating]);

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
    <div className="flex justify-center mt-10">
      <div className="flex justify-center basis-1/4">
        <div className="flex flex-col">
          <img
            className="mb-8"
            src={book.cover || "../default_cover.jpg"}
          />
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
              <ReviewDialogue bookInDb={bookInDb!} dbUser={dbUser} numericBookRating={numericBookRating}/>
            </div>
          )}
        </div>
      </div>
      <div className="flex w-screen justify-start flex-col mr-4">
        <div className="flex flex-row">
          <h1 className="mr-4">{book.title}</h1>
          {logged && <ReadRating value={averageBookRating} />}
        </div>
        {logged && (
          <h2>{`Average: ${averageBookRating} - Number of ratings: ${numberOfRatings}`}</h2>
        )}
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
        <>
            <div className="mt-8 font-bold">{"Reviews"}</div>
            <Separator className="my-4" />
          </>
          <Reviews bookInDb={bookInDb} bookReview={bookReview}/>
      </div>
    </div>
  );
}
