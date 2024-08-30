"use client";

import { actionGetUsernameFromClerk } from "@/actions/clerk-users";
import { actionGetReviewsByBookId } from "@/actions/reviews";
import { Book } from "@/models/book";
import { Review } from "@/models/review";
import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";
import ReadRating from "./ReadRating";

type ReviewsProps = {
  bookInDb: Book | null;
  bookReview: Review | null;
  numericBookRating: number | null;
};

export default function Reviews({
  bookInDb,
  bookReview,
  numericBookRating
}: ReviewsProps) {
  const { user } = useUser();
  const [bookReviews, setBookReviews] = useState<Review[] | null>(null);

  const fetchUsers = useCallback(async () => {
    const username = await actionGetUsernameFromClerk(user?.id!);
    console.log(username);
  }, []);

  const fetchReviews = useCallback(async () => {
    const allReviews: Review[] = await actionGetReviewsByBookId(bookInDb?.id!);
    if (bookReview !== null) {
      const otherMembersReviews = allReviews.filter(
        (review) => review.userId !== bookReview.userId
      );
      setBookReviews(otherMembersReviews);
    } else {
      setBookReviews(allReviews);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, []);

  console.log(bookReview?.createdAt)
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
              <div>{bookReview.createdAt!.toLocaleString("es-ES", {year: "numeric",
    month: "long",
    day: "numeric",
  })}</div>
              <div className="mt-2">{bookReview.comment}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
