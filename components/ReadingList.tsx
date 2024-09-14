"use client";

import { actionGetBooksByUserIdAndReadingStatus } from "@/actions/book-status";
import { useDbUser } from "@/app/context/db-user-context";
import { BookStatus } from "@/models/book-status";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { Button } from "./ui/button";

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
  const router = useRouter();

  const [readingList, setReadingList] = useState<BookStatus[]>([]);
  const [currentPage, setCurrentPage] = useState(0); // State for pagination

  const [booksPerPage, setBooksPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height > 1000) {
        setBooksPerPage(4);
      } else {
        setBooksPerPage(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="rounded-xl shadow-lg shadow-sky-700 p-8 bg-sky-600 text-slate-100 h-full ">
      <h1 className="font-light text-sky-50 text-center">
        Currently Reading
      </h1>
      <div className="flex flex-row justify-center h-full">
        {readingList.length > booksPerPage && (
          <Image
            className={`cursor-pointer mb-16 hover:scale-105 transition duration-500 ${
              currentPage === 0 ? "opacity-20 pointer-events-none" : ""
            }`}
            src={"/prev-arrow.svg"}
            onClick={handlePrev}
            alt={"preview"}
            width={40}
            height={40}
          />
        )}
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
              <div className="flex items-center justify-center h-full">
                <Button
                  className="text-lg"
                  disabled={dbUser === null}
                  onClick={() => router.push("/lists?listId=READING")}
                >
                  View More
                </Button>
              </div>
            </>
          )}

          {dbUser && readingList.length == 0 && (
            <div className="flex justify-center items-center h-full">
              <p>Start reading to see something here!</p>
            </div>
          )}

          {!dbUser && (
            <div className="flex justify-center items-center h-full">
              <p>Login to see the books you are reading here!</p>
            </div>
          )}
        </div>
        {readingList.length > booksPerPage && (
          <Image
            className={`cursor-pointer mb-16 hover:scale-105 transition duration-500 ${
              endIndex >= readingList.length
                ? "opacity-20 pointer-events-none"
                : ""
            }`}
            src={"/next-arrow.svg"}
            onClick={handleNext}
            alt={"next"}
            width={40}
            height={40}
          />
        )}
      </div>
    </div>
  );
}
