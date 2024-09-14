"use client";

import { actionGetBooksByUserIdAndReadingStatus } from "@/actions/book-status";
import { useDbUser } from "@/app/context/db-user-context";
import { BookStatus } from "@/models/book-status";
import Image from "next/image";
import { useEffect, useState } from "react";
import BookCardWantToRead from "./BookCardWantToRead";

interface WantToReadProps {
  newBookSignal: (bool: boolean) => void;
  bookRead: boolean;
}

const initialState: BookStatus[] = [];

export default function WantToRead({
  newBookSignal,
  bookRead,
}: WantToReadProps) {
  const { dbUser } = useDbUser();

  const [readingList, setLists] = useState(initialState);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getLists();
  }, [dbUser, bookRead]);

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
    <div className="flex flex-col justify-start rounded-xl shadow-lg shadow-orange-700 bg-orange-500 pl-8 pr-8 pt-4 text-orange-50 h-1/3">
      <h1 className="font-light text-orange-50 text-center  border-b-2">
        Want to Read
      </h1>
      <div className="relative flex flex-row items-center justify-center h-full w-full">
        {readingList.length > 1 && (
          <Image
            className="cursor-pointer opacity-85 hover:opacity-100 hover:scale-110 transition duration-500"
            src={"/prev-arrow.svg"}
            onClick={handlePrev}
            alt={"previous"}
            width={40}
            height={40}
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
            className="cursor-pointer opacity-85 hover:opacity-100 hover:scale-110 transition duration-500"
            src={"/next-arrow.svg"}
            onClick={handleNext}
            alt={"next"}
            width={40}
            height={40}
          />
        )}

        {dbUser && readingList.length === 0 && (
          <p>Save some books to see something here!</p>
        )}
        {!dbUser && <p>Login to see the books you want to read here!</p>}
      </div>
    </div>
  );
}
