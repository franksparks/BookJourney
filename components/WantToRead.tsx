"use client";

import { useDbUser } from "@/app/context/db-user-context";
import BookCard from "./BookCard";
import { useEffect, useState } from "react";
import { actionGetBooksByUserIdAndReadingStatus } from "@/actions/book-status";
import { BookStatus } from "@/models/book-status";

const initialState: BookStatus[] = [];

export default function WantToRead() {
  const { dbUser } = useDbUser();

  const [readingList, setLists] = useState(initialState);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getLists();
  }, [dbUser]);

  const getLists = async () => {
    if (dbUser != null) {
      const userLists = await actionGetBooksByUserIdAndReadingStatus(
        dbUser.id,
        "WANT_TO_READ"
      );
      setLists(userLists);
      setActiveIndex(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === readingList.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5 secs

    return () => clearInterval(interval);
  }, [readingList]);

  const handleStatusChange = async () => {
    await getLists();
  };

  return (
    <div className="flex flex-col justify-start rounded-3xl shadow-xl shadow-sky-200 p-4 bg-sky-600 text-sky-50 h-2/5 overflow-y-auto">
      <h1 className="font-light text-sky-200 text-center">Want to Read</h1>
      <div className="relative flex flex-col items-center justify-center h-full w-full">
        {dbUser && readingList.length > 0 && (
          <div className="relative w-full h-full">
            {readingList.map((element, index) => (
              <div
                key={index}
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full transition-opacity duration-500 ease-in-out ${
                  index === activeIndex
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                } flex justify-center items-center`}
              >
                <BookCard
                  book={element.book}
                  status={element}
                  onStatusChange={handleStatusChange}
                />
              </div>
            ))}
          </div>
        )}
        {dbUser && readingList.length === 0 && (
          <div>Start reading to see something here!</div>
        )}
        {!dbUser && <div>Login to see the books you are reading here!</div>}
      </div>
    </div>
  );
}
