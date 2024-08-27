"use client";

import { actionGetUsernameFromClerk } from "@/actions/clerk-users";
import { actionGetReviewsByBookId } from "@/actions/reviews";
import { useDbUser } from "@/app/context/db-user-context";
import { Book } from "@/models/book";
import { Review } from "@/models/review";
import { User } from "@/models/user";
import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";

type ReviewsProps = {
  bookInDb: Book | null;
  bookReview: Review | null;
};

export default function Reviews({ bookInDb, bookReview }: ReviewsProps) {
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

  return (
    <>
    <h2 className="text-xl font-bold">{'My Review'}</h2>
      {bookReview !== null && <div>{''}</div>}
    </>
  );
}
