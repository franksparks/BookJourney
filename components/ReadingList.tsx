"use client";

import { actionGetBooksByUserIdAndReadingStatus } from "@/actions/book-status";
import { useDbUser } from "@/app/context/DbUserContext";
import { BookStatus } from "@/models/bookStatus";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";

const initialState: BookStatus[] = [];

export default function UserLists() {
  const { dbUser } = useDbUser();

  const [readingList, setLists] = useState(initialState);

  useEffect(() => {
    getLists();
  }, [dbUser]);

  const getLists = async () => {
    if (dbUser != null) {
      const userLists = await actionGetBooksByUserIdAndReadingStatus(
        dbUser.id,
        "READING"
      );
      console.log(JSON.stringify(userLists));

      setLists(userLists);
    }
  };

  //TODO: Add a loading for this component

  return (
    <div className="flex flex-row">
      <div className="rounded-3xl shadow-xl shadow-sky-200 p-8 bg-sky-600 text-slate-100 w-96 h-96 overflow-y-auto">
        <h1 className="font-light text-sky-200">Currently Reading</h1>
        {dbUser &&
          readingList.map((element: BookStatus, index) => (
            <BookCard key={index} book={element.book} />
          ))}
        {dbUser && readingList.length == 0 && (
          <div>Start reading to see something here!</div>
        )}
        {!dbUser && <div>Login to see the books you are reading here!</div>}
      </div>
    </div>
  );
}
