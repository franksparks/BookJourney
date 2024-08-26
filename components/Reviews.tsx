"use client"

import { actionGetUsernameFromClerk } from "@/actions/clerk-users";
import { Book } from "@/models/book";
import { Review } from "@/models/review";
import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";

type ReviewsProps = {
    bookInDb: Book | null;
    dbUser: any;
};


export default function Reviews({ bookInDb, dbUser}: ReviewsProps) {

    const { user } = useUser();


    const [bookReviews, setBookReviews] = useState<Review | null>(null);

    const fetchUsers = useCallback(async () => {
        const username = await actionGetUsernameFromClerk(user?.id!);
        console.log(username);
      }, []);

    useEffect(() => {
        fetchUsers();
    });

    return (<div>{user?.username}</div>)
  
}
