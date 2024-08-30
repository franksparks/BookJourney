"use client";

import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import ReadRating from "./ReadRating";
import {
  actionGetAvatarFromClerk,
  actionGetUsernameFromClerk
} from "@/actions/clerk-users";
import { actionGetReviewsByBookId } from "@/actions/reviews";
import { actionGetUserByUserId } from "@/actions/users";
import { ratingMap } from "@/models/rating";
import { Book } from "@/models/book";
import { Review } from "@/models/review";
import { User } from "@/models/user";
import { actionGetRatingByGoogleBookIdAndUserId } from "@/actions/ratings";

type ReviewsProps = {
  bookInDb: Book | null;
  bookReview: Review | null;
  numericBookRating: number | null;
};

type BookDetailsReview = {
  comment: string;
  rating: number;
  userAvatar: string;
  username: string;
  creationDate: string;
};

export default function Reviews({
  bookInDb,
  bookReview,
  numericBookRating
}: ReviewsProps) {
  const { user } = useUser();
  const [bookReviews, setBookReviews] = useState<Review[] | null>(null);
  const [bookDetailsReviews, setBookDetailsReviews] = useState<
    BookDetailsReview[] | null
  >(null);
  const reviewsFetched = useRef(false);

  const fetchReviews = useCallback(async () => {
    if (reviewsFetched.current) return;
    reviewsFetched.current = true;

    const allReviews: Review[] = await actionGetReviewsByBookId(bookInDb?.id!);
    if (bookReview !== null) {
      const otherMembersReviews = allReviews.filter(
        (review) => review.userId !== bookReview.userId
      );
      setBookReviews(otherMembersReviews);
    } else {
      setBookReviews(allReviews);
    }
  }, [bookInDb, bookReview]);

  const fetchBookDetailsReviews = useCallback(async () => {
    if (!bookReviews) return;

    const reviews: BookDetailsReview[] = await Promise.all(
      bookReviews.map(async (review) => {
        const dbUser: User | null = await actionGetUserByUserId(review.userId);
        const username: string =
          (await actionGetUsernameFromClerk(dbUser?.clerkId!)) || "";
        const userAvatar: string = await actionGetAvatarFromClerk(
          dbUser?.clerkId!
        );
        const rating = await actionGetRatingByGoogleBookIdAndUserId(
          bookInDb?.googleBooksId!,
          dbUser?.id!
        );
        const numericRating: number =
          rating !== undefined ? ratingMap[rating.rating] : 0;
        const creationDate = review.createdAt || "";

        return {
          comment: review.comment,
          rating: numericRating,
          userAvatar,
          username,
          creationDate
        };
      })
    );

    setBookDetailsReviews(reviews);
  }, [bookReviews, bookInDb]);

  useEffect(() => {
    if (bookInDb) {
      fetchReviews();
    }
  }, [fetchReviews, bookInDb]);

  useEffect(() => {
    fetchBookDetailsReviews();
  }, [fetchBookDetailsReviews]);
  return (
    <>
      {bookReview !== null && (
        <>
          <div className="font-bold mb-4">{"My Review"}</div>
          <div className="flex">
            <div className="basis-1/6">
              <img
                src={user?.imageUrl}
                className={"w-8 h-8 mb-2 rounded-full"}
              />
              <div>{user?.username}</div>
            </div>
            <div className="flex flex-col">
              <ReadRating value={numericBookRating!} size={"small"} />
              <div>{format(bookReview.createdAt!, "dd/MM/yyyy")}</div>
              <div className="mt-2">{bookReview.comment}</div>
            </div>
          </div>
        </>
      )}

      {bookDetailsReviews && bookDetailsReviews.length > 0 && (
        <>
          <div className="font-bold mt-8 mb-4">{"Other Reviews"}</div>
          {bookDetailsReviews.map((review, index) => (
            <div className="flex mb-4" key={index}>
              <div className="basis-1/6">
                <img
                  src={review.userAvatar}
                  className={"w-8 h-8 mb-2 rounded-full"}
                />
                <div>{review.username}</div>
              </div>
              <div className="flex flex-col">
                <ReadRating value={review.rating} size={"small"} />
                <div>{format(review.creationDate!, "dd/MM/yyyy")}</div>
                <div className="mt-2">{review.comment}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
