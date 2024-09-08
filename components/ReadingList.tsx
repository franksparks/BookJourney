"use client";

import { actionGetBooksByUserIdAndReadingStatus } from "@/actions/book-status";
import { useDbUser } from "@/app/context/db-user-context";
import { BookStatus } from "@/models/book-status";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import Image from "next/image";

interface ReadingListProps {
  onBookRead: () => void;
  bookSignal: boolean;
  newBookSignal: (bool: boolean) => void;
}

export default function ReadingList({
  onBookRead,
  bookSignal,
  newBookSignal,
}: ReadingListProps) {
  const { dbUser } = useDbUser();

  const [readingList, setReadingList] = useState<BookStatus[]>([]);
  const [currentPage, setCurrentPage] = useState(0); // State for pagination
  const booksPerPage = 3;

  useEffect(() => {
    getReadingList();
  }, [dbUser, bookSignal]);

  const getReadingList = async () => {
    if (dbUser != null) {
      const userReadingList = await actionGetBooksByUserIdAndReadingStatus(
        dbUser.id,
        "READING"
      );
      setReadingList(userReadingList);
      setCurrentPage(0);
    }
    newBookSignal(false);
  };

  const handleStatusChange = async () => {
    await getReadingList();
    onBookRead();
  };

  const startIndex = currentPage * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = readingList.slice(startIndex, endIndex);

  const handleNext = () => {
    if (endIndex < readingList.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="rounded-3xl shadow-xl shadow-sky-200 p-8 bg-sky-600 text-slate-100 h-full ">
      <h1 className="font-light text-sky-200 text-center">Currently Reading</h1>

      <div className="flex flex-col items-center">
        {dbUser && currentBooks.length > 0 && (
          <>
            {currentBooks.map((element: BookStatus, index) => (
              <BookCard
                key={index}
                book={element.book}
                status={element}
                onStatusChange={handleStatusChange}
              />
            ))}

            {readingList.length > booksPerPage && (
              <div className="flex justify-between w-full mt-4">
                <Image
                  className={`cursor-pointer hover:scale-105 transition duration-500 ${
                    currentPage === 0 ? "opacity-20 pointer-events-none" : ""
                  }`}
                  src={"/prev-arrow.svg"}
                  onClick={handlePrev}
                  alt={"preview"}
                  width={50}
                  height={50}
                />
                <Image
                  className={`cursor-pointer hover:scale-105 transition duration-500 ${
                    endIndex >= readingList.length
                      ? "opacity-20 pointer-events-none"
                      : ""
                  }`}
                  src={"/next-arrow.svg"}
                  onClick={handleNext}
                  alt={"next"}
                  width={50}
                  height={50}
                />{" "}
              </div>
            )}
          </>
        )}

        {dbUser && readingList.length == 0 && (
          <div>Start reading to see something here!</div>
        )}
        {!dbUser && <div>Login to see the books you are reading here!</div>}
      </div>
    </div>
  );
}
