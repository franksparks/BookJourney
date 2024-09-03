"use client";

import { actionGetBookByGoogleId, actionInsertBook } from "@/actions/books";
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
import ParametrizedPagination from "./ParametrizedPagination";
import Image from "next/image";

type BookDetailsProps = {
  book: Book;
};

export default function BookDetails({ book }: BookDetailsProps) {
  const { dbUser } = useDbUser();
  const [numericBookRating, setNumericBookRating] = useState<number | null>(0);
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
    <div className="flex justify-center m-8 bg-sky-50 shadow-lg shadow-sky-600 p-12 rounded-3xl">
      <div className="flex flex-col justify-evenly items-center w-1/4">
        {book.cover ? (
          <Image
            className="mb-8 shadow-lg shadow-sky-600 rounded-lg"
            alt={book.title}
            src={book.cover}
            width={150}
            height={200}
          />
        ) : (
          <Image
            className="mb-8"
            alt={book.title}
            src={"/default_cover.jpg"}
            width={100}
            height={100}
          />
        )}
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
      </div>
      <div className="flex w-screen justify-start flex-col mr-4">
        <div className="flex flex-row">
          <h1 className="mr-4 mb-8">{book.title}</h1>
          {logged && <ReadRating value={averageBookRating} />}
        </div>
        {logged && (
          <h2>{`Average: ${averageBookRating} - Number of ratings: ${numberOfRatings}`}</h2>
        )}
        <Separator className="my-4" />
        {(book.authors &&
          book.authors.map((author, index) => (
            <h2 className="text-2xl italic text-slate-600" key={index}>
              {" "}
              {author}{" "}
            </h2>
          ))) || <h2> {"Unknown author"} </h2>}
        {book.description && <ReadMore text={book.description} />}
        {book.categories && (
          <>
            <div className="mt-8 mb-4 text-xl">{"Genres"}</div>
            <div className="flex h-5 items-center space-x-4 gap-4">
              {book.categories.map((category, index) => (
                <div key={index}>{category}</div>
              ))}
            </div>
          </>
        )}
        <div className="flex flex-row justify-between items-center mt-8 mr-12">
          <div className="text-xl items-center">{"This edition"}</div>

          {book.pages !== 0 && (
            <div className="flex flex-row items-center gap-2">
              <div>Pages</div>
              <Image alt={"pages"} src={"/pages.svg"} width={30} height={30} />
              <div>{book.pages}</div>
            </div>
          )}
          {book.language && (
            <div className="flex flex-row items-center gap-2">
              <div>Published</div>
              <Image
                alt={"calendar"}
                src={"/calendar.svg"}
                width={30}
                height={30}
              />
              <div>{book.publishedDate}</div>
            </div>
          )}
          {book.language && (
            <div className="flex flex-row items-center gap-2">
              <div>Language</div>
              <Image
                alt={"language"}
                src={"/language.svg"}
                width={30}
                height={30}
              />
              <div>{book.language.toUpperCase()}</div>
            </div>
          )}
        </div>
        <>
          <Separator className="my-4" />
        </>
        <Reviews
          bookInDb={bookInDb}
          numericBookRating={numericBookRating}
          bookReview={bookReview}
        />
      </div>
    </div>
  );
}
