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
import { useDbUser } from "@/app/context/db-user-context";
import ParametrizedPagination from "./ParametrizedPagination";
import Skeleton from "@mui/material/Skeleton";

type ReviewsProps = {
  bookInDb: Book | null;
  numericBookRating: number | null;
  bookReview: Review | null;
};

type BookDetailsReview = {
  comment: string;
  rating: number;
  userAvatar: string;
  username: string;
  creationDate: string;
};

type Accumulator = {
  userReview: Review[];
  otherMembersReviews: Review[];
};

export default function Reviews({
  bookInDb,
  numericBookRating,
  bookReview
}: ReviewsProps) {
  const { user } = useUser();
  const { dbUser } = useDbUser();
  const [userBookReview, setUserBookReview] = useState<Review | null>(null);
  const [bookReviews, setBookReviews] = useState<Review[] | null>(null);
  const [bookDetailsReviews, setBookDetailsReviews] = useState<
    BookDetailsReview[] | null
  >(null);
  const [paginatedReviews, setPaginatedReviews] = useState<BookDetailsReview[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  const fetchReviews = useCallback(async () => {
    if (bookInDb && dbUser) {
      const allReviews: Review[] = await actionGetReviewsByBookId(
        bookInDb?.id!
      );

      const { userReview, otherMembersReviews } =
        allReviews.reduce<Accumulator>(
          (acc, review) => {
            if (review.userId === dbUser.id) {
              acc.userReview.push(review);
            } else {
              acc.otherMembersReviews.push(review);
            }
            return acc;
          },
          { userReview: [], otherMembersReviews: [] }
        );

      const review: Review = userReview[0] || null;

      setUserBookReview(review);
      setBookReviews(otherMembersReviews);
    }
  }, [bookInDb, dbUser, bookReview]);

  const fetchBookDetailsReviews = useCallback(async () => {
    if (!bookReviews) return;

    setLoading(true);

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

    setLoading(false);
  }, [bookReviews, bookInDb]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews, bookInDb, dbUser]);

  useEffect(() => {
    fetchBookDetailsReviews();
  }, [fetchBookDetailsReviews]);

  useEffect(() => {
    if (bookDetailsReviews) {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setPaginatedReviews(bookDetailsReviews.slice(startIndex, endIndex));
    }
  }, [bookDetailsReviews, page]);

  return (
    <>
      {userBookReview !== null && (
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
              <div>{format(userBookReview.createdAt!, "dd/MM/yyyy")}</div>
              <div className="mt-2">{userBookReview.comment}</div>
            </div>
          </div>
        </>
      )}

      {loading && (
        <>
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-10 w-1/2" />
          ))}
        </>
      )}

      {paginatedReviews && paginatedReviews.length > 0 && (
        <>
          <div className="font-bold mt-8 mb-4">{"Other Reviews"}</div>
          {paginatedReviews.map((review, index) => (
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
      {bookDetailsReviews && bookDetailsReviews.length > 0 && (
        <ParametrizedPagination
          setPage={setPage}
          page={page}
          totalItems={bookDetailsReviews?.length || 0}
          numItemsPerPage={itemsPerPage}
        />
      )}
    </>
  );
}
