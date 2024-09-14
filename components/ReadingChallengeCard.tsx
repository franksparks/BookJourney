"use client";

import { actionGetBooksReadByUserIdAndYear } from "@/actions/reading-activity";
import {
  actionDeleteChallenge,
  actionGetReadingChallengeByUserIdAndYear,
  actionInsertReadingChallenge,
  actionMarkChallengeAsCelebrated,
  actionMarkChallengeAsNotCelebrated,
  actionUpdateChallenge,
} from "@/actions/reading-challenge";
import { useDbUser } from "@/app/context/db-user-context";
import { ReadingChallenge } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Button } from "./ui/button";
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
import { Tooltip } from "@mui/material";

interface ReadingChallengeCardProps {
  bookRead: boolean;
  onReset: () => void;
}

export default function ReadingChallengeCard({
  bookRead,
  onReset,
}: ReadingChallengeCardProps) {
  const { dbUser } = useDbUser();

  const logged = dbUser ? true : false;

  const year = new Date().getFullYear();

  const [readBooks, setReadBooks] = useState<ReadingChallenge[]>([]);
  const [currentChallenge, setCurrentChallenge] =
    useState<ReadingChallenge | null>();
  const [newGoal, setNewGoal] = useState(0);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmationDialogOpen, setConfirmationIsDialogOpen] =
    useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    getReadBooks();
  }, [dbUser, bookRead]);

  useEffect(() => {
    getCurrentChallenge();
  }, [dbUser]);

  useEffect(() => {
    if (
      currentChallenge &&
      currentChallenge.hasCelebrated == false &&
      readBooks.length >= currentChallenge.goal
    ) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 10000);
      actionMarkChallengeAsCelebrated(currentChallenge.id);
    }
  }, [readBooks.length, currentChallenge, bookRead]);

  const getReadBooks = async () => {
    if (dbUser != null) {
      const booksRead = await actionGetBooksReadByUserIdAndYear(
        dbUser.id,
        year
      );
      setReadBooks(booksRead);
      onReset();
    }
  };

  const getCurrentChallenge = async () => {
    if (dbUser != null) {
      const challenge: ReadingChallenge =
        await actionGetReadingChallengeByUserIdAndYear(year, dbUser.id);

      if (challenge != null) {
        setCurrentChallenge(challenge);
      }
    }
  };

  const handleSetReadingChallenge = async () => {
    if (newGoal <= 0) {
      alert("Please enter a valid number.");
      return;
    }
    const res = await actionInsertReadingChallenge(
      newGoal,
      year,
      dbUser.id
    );
    setCurrentChallenge(res);
    setIsDialogOpen(false);
  };

  const handleEditReadingChallenge = async () => {
    if (newGoal <= 0) {
      alert("Please enter a valid number.");
      return;
    }
    if (currentChallenge) {
      const res = await actionUpdateChallenge(
        currentChallenge.id,
        newGoal
      );
      setCurrentChallenge(res);
      actionMarkChallengeAsNotCelebrated(currentChallenge.id);
      setIsDialogOpen(false);
    }
  };
  const handleDeleteReadingChallenge = async () => {
    if (currentChallenge) {
      const res = await actionDeleteChallenge(currentChallenge.id);
      setCurrentChallenge(null);
      setConfirmationIsDialogOpen(false);
    }
  };

  return (
    <>
      {showConfetti && <Confetti />}

      <div className="flex flex-col justify-start rounded-xl shadow-lg shadow-orange-700 pl-8 pr-8 pt-4 bg-orange-500 text-white h-1/3">
        <h1 className="font-light text-orange-50 text-center  border-b-2">
          {year} Reading Challenge
        </h1>

        <div className="flex flex-row items-center h-full">
          {dbUser === null ? (
            <div className="flex flex-col justify-center items-center h-full w-full">
              <p className="mb-2">Login to set a reading challenge!</p>
            </div>
          ) : currentChallenge === null ||
            currentChallenge === undefined ? (
            <div className="flex flex-col justify-center items-center h-full w-full ml-10 mt-5 gap-5">
              <p className="mb-2">Set a reading challenge!</p>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button disabled={!logged}>
                    Set a reading challenge
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
                        value={newGoal === 0 ? "" : newGoal}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "" || Number(value) > 0) {
                            setNewGoal(Number(value));
                          }
                        }}
                        step="1"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSetReadingChallenge}>
                      Set reading challenge
                    </Button>
                    <Button
                      variant={"cancel"}
                      onClick={() => {
                        setConfirmationIsDialogOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <div className="flex flex-row w-full h-full justify-around items-center">
              <div>
                <Image
                  className="hover:scale-105 transition duration-1000 h-auto xl:w-24"
                  src={"/book-square-svgrepo-com.svg"}
                  alt="cover"
                  width="0"
                  height="0"
                  sizes="100vw"
                  priority={false}
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="mb-2 text-2xl">
                  <span className="text-3xl">{readBooks.length}</span>{" "}
                  books completed
                </p>
                <p className="mb-2">
                  {readBooks.length}/{currentChallenge.goal} (
                  {(
                    (readBooks.length / currentChallenge.goal) *
                    100
                  ).toFixed(1)}
                  %)
                </p>
                <div className="w-36 bg-gray-200 rounded-full h-4 border-2 border-gray-300 mb-2">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      readBooks.length >= currentChallenge.goal
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                    style={{
                      width: `${Math.min(
                        (readBooks.length / currentChallenge.goal) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>Edit challenge</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reading challenge!</DialogTitle>
                      <DialogDescription>
                        Edit your goal for this year
                      </DialogDescription>
                    </DialogHeader>
                    <div>
                      <div className="items-center gap-4 mt-4">
                        <Input
                          id="value"
                          className="col-span-3"
                          type="number"
                          value={newGoal === 0 ? "" : newGoal}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "" || Number(value) > 0) {
                              setNewGoal(Number(value));
                            }
                          }}
                          step="1"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleEditReadingChallenge}>
                        Set reading challenge
                      </Button>

                      <Button
                        variant={"cancel"}
                        onClick={() => {
                          setIsDialogOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={isConfirmationDialogOpen}
                  onOpenChange={setConfirmationIsDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant={"destructive"}>
                      Delete reading challenge
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Remove reading challenge!</DialogTitle>
                      <DialogDescription>
                        Delete your reading goal for this year
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                      <Button
                        variant={"destructive"}
                        onClick={handleDeleteReadingChallenge}
                      >
                        Delete challenge
                      </Button>
                      <Button
                        variant={"cancel"}
                        onClick={() => {
                          setConfirmationIsDialogOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
