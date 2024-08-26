import { Book } from "@/models/book";
import { Review } from "@/models/review";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

type ReviewsProps = {
    bookInDb: Book | null;
    dbUser: any;
};





export default function Reviews({ bookInDb, dbUser}: ReviewsProps) {

    const { user } = useUser();



    const [bookReviews, setBookReviews] = useState<Review | null>(null);

    

    return (<div>{user?.username}</div>)
  
}
