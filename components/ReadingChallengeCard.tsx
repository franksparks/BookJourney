"use client";

import { actionGetBooksReadByUserIdAndYear } from "@/actions/reading-activity";
import {
  actionGetReadingChallengeByUserIdAndYear,
  actionInsertReadingChallenge,
} from "@/actions/reading-challenge";
import { useDbUser } from "@/app/context/db-user-context";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ReadingChallenge } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

export default function ReadingChallengeCard() {
  const { dbUser } = useDbUser();

  const year = new Date().getFullYear();

  const [readBooks, setReadBooks] = useState<ReadingChallenge[]>([]);
  const [challengeGoal, setChallengeGoal] = useState(0);
  const [readingChallenge, setReadingChallenge] = useState(0);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

      if (challenge != null) {
        setChallengeGoal(challenge.goal);
      }
    }
  };

  const handleSetReadingChallenge = async () => {
    if (readingChallenge <= 0) {
      alert("Please enter a valid number.");
      return;
    }
    await actionInsertReadingChallenge(readingChallenge, year, dbUser.id);
    setChallengeGoal(readingChallenge);
    setIsDialogOpen(false);
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
          {challengeGoal === 0 ? (
            <div className="ml-10">
              <p className="mb-2">No reading challenge set yet.</p>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-full border-orange-400 border-2 hover:border-blue-600">
                    Set reading challenge
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reading challenge!</DialogTitle>
                    <DialogDescription>
                      Set a reading challenge for {year}
                    </DialogDescription>
                  </DialogHeader>
                  <div>
                    <div className="items-center gap-4 mt-4">
                      <Input
                        id="value"
                        className="col-span-3"
                        type="number"
                        value={readingChallenge === 0 ? "" : readingChallenge} // Permite mostrar una cadena vacía
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "" || Number(value) > 0) {
                            setReadingChallenge(Number(value));
                          }
                        }}
                        step="1"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleSetReadingChallenge}
                      className="rounded-full border-orange-400 border-2"
                    >
                      Set reading challenge
                    </Button>
                    <Button
                      onClick={() => {
                        setIsDialogOpen(false);
                      }}
                      className="rounded-full border-orange-400 border-2"
                    >
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
}
