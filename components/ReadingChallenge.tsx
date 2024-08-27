"use client";

import { actionGetBooksReadByUserIdAndYear } from "@/actions/reading-activity";
import { actionGetReadingChallengeByUserIdAndYear } from "@/actions/reading-challenge";
import { useDbUser } from "@/app/context/db-user-context";
import { ReadingChallenge } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ReadingChallenge() {
  const { dbUser } = useDbUser();

  const year = new Date().getFullYear();

  const [readBooks, setReadBooks] = useState<ReadingChallenge[]>([]);
  const [challengeGoal, setChallengeGoal] = useState(0);

  useEffect(() => {
    getReadBooks();
  }, [dbUser]);

  useEffect(() => {
    getChallengeGoal();
  }, [dbUser]);

  const getReadBooks = async () => {
    if (dbUser != null) {
      const booksRead = await actionGetBooksReadByUserIdAndYear(
        dbUser.id,
        year
      );
      setReadBooks(booksRead);
    }
  };

  const getChallengeGoal = async () => {
    if (dbUser != null) {
      const challenge: ReadingChallenge =
        await actionGetReadingChallengeByUserIdAndYear(year, dbUser.id);
      setChallengeGoal(challenge.goal);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center rounded-3xl shadow-xl shadow-orange-200 p-8 bg-orange-500 text-orange-100 mt-10">
        <h1 className="font-light text-orange-100 text-center mb-2">
          {year} Reading Challenge
        </h1>
        <div className="flex flex-row items-center">
          <Image
            className="shadow-md shadow-sky-700 rounded hover:scale-105 transition duration-1000"
            src={"/default_cover.jpg"}
            alt="cover"
            width={100}
            height={120}
          />
          <div className="ml-10">
            <p className="mb-2">
              <span className="text-3xl">{readBooks.length}</span> books
              completed
            </p>
            <p className="mb-2">
              {readBooks.length}/{challengeGoal} (
              {((readBooks.length / challengeGoal) * 100).toFixed(1)}%)
            </p>
            <div className="w-36 bg-gray-200 rounded-full h-4 border-2 border-gray-300 mb-2">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{
                  width: `${(readBooks.length / challengeGoal) * 100}%`,
                }}
              ></div>
            </div>
            <div className="flex flex-row gap-2">
              <Button className="rounded-full border-orange-400 border-2 hover:border-blue-600">
                Edit challenge
              </Button>
              {/*Todo: Redirect to a list of the read books this year*/}
              <Button className="rounded-full border-orange-400 border-2 hover:border-blue-600">
                View challenge
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
