"use client";

import { useDbUser } from "@/app/context/db-user-context";
import { useEffect, useState } from "react";
import { actionGetBooksByUserIdAndReadingStatus } from "@/actions/book-status";
import { BookStatus } from "@/models/book-status";
import BookCardWantToRead from "./BookCardWantToRead";
import { Button } from "./ui/button";
import Image from "next/image";

interface WantToReadProps {
  newBookSignal: (bool: boolean) => void;
}

const initialState: BookStatus[] = [];

export default function WantToRead({ newBookSignal }: WantToReadProps) {
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
    newBookSignal(true);
  };

  // Handlers for manual navigation
  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === readingList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? readingList.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col justify-start rounded-3xl shadow-xl shadow-orange-200 bg-orange-500 p-4 text-orange-50 h-1/3">
      <h1 className="font-light text-orange-100 text-center">Want to Read</h1>
      <div className="relative flex flex-row items-center justify-center h-full w-full">
        {readingList.length > 1 && (
          <Image
            className="cursor-pointer opacity-90 hover:opacity-100 hover:scale-105 transition duration-500"
            src={"/prev-arrow.svg"}
            onClick={handlePrev}
            alt={"previous"}
            width={50}
            height={50}
          />
        )}

        {dbUser && readingList.length > 0 && (
          <>
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
                  <BookCardWantToRead
                    book={element.book}
                    status={element}
                    onStatusChange={handleStatusChange}
                    newBookSignal={Boolean}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        {readingList.length > 1 && (
          <Image
            className="cursor-pointer opacity-90 hover:opacity-100 hover:scale-105 transition duration-500"
            src={"/next-arrow.svg"}
            onClick={handleNext}
            alt={"next"}
            width={50}
            height={50}
          />
        )}

        {dbUser && readingList.length === 0 && (
          <div>Start reading to see something here!</div>
        )}
        {!dbUser && <div>Login to see the books you are reading here!</div>}
      </div>
    </div>
  );
}
