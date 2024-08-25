"use client";

import { actionGetBooksByUserIdAndReadingStatus } from "@/actions/book-status";
import { useDbUser } from "@/app/context/db-user-context";
import { BookStatus } from "@/models/book-status";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";

export default function ReadingList() {
  const { dbUser } = useDbUser();

  const [readingList, setReadingList] = useState<BookStatus[]>([]);

  useEffect(() => {
    getReadingList();
  }, [dbUser]);

  const getReadingList = async () => {
    if (dbUser != null) {
      const userReadingList = await actionGetBooksByUserIdAndReadingStatus(
        dbUser.id,
        "READING"
      );
      setReadingList(userReadingList);
    }
  };

  const handleStatusChange = async () => {
    await getReadingList(); // Refresh the list
  };

  //TODO: Add a loading for this component

  return (
    <div className="rounded-3xl shadow-xl shadow-sky-200 p-8 bg-sky-600 text-slate-100 h-full overflow-y-auto">
      <h1 className="font-light text-sky-200 text-center">
        Currently Reading
      </h1>

      <div className="flex flex-col items-center">
        {dbUser &&
          readingList.map((element: BookStatus, index) => (
            <BookCard
              key={index}
              book={element.book}
              status={element}
              onStatusChange={handleStatusChange}
            />
          ))}
        {dbUser && readingList.length == 0 && (
          <div>Start reading to see something here!</div>
        )}
        {!dbUser && (
          <div>Login to see the books you are reading here!</div>
        )}
      </div>
    </div>
  );
}
