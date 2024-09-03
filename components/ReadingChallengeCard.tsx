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

      <div className="flex flex-col items-center rounded-3xl shadow-xl shadow-orange-200 p-8 bg-orange-500 text-orange-100 h-1/3">
        <h1 className="font-light text-orange-100 text-center mb-2">
          {year} Reading Challenge
        </h1>
        <div className="flex flex-row items-center">
          {currentChallenge === null ||
          currentChallenge === undefined ||
          dbUser === null ? (
            <div className="ml-10">
              <p className="mb-2">No reading challenge set yet.</p>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    disabled={!logged}
                    className="rounded-full border-orange-400 border-2 hover:border-blue-600"
                  >
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
                    <Button
                      onClick={handleSetReadingChallenge}
                      className="rounded-full border-orange-400 border-2"
                    >
                      Set reading challenge
                    </Button>
                    <Button
                      onClick={() => {
                        setConfirmationIsDialogOpen(false);
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
              <div className="flex flex-row gap-2">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="rounded-full border-orange-400 border-2 hover:border-blue-600">
                      Edit challenge
                    </Button>
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
                      <Button
                        onClick={handleEditReadingChallenge}
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

                <Dialog
                  open={isConfirmationDialogOpen}
                  onOpenChange={setConfirmationIsDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="rounded-full border-orange-400 bg-red-400 hover:bg-red-600 border-2">
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
                        onClick={handleDeleteReadingChallenge}
                        className="rounded-full border-orange-400 bg-red-400 hover:bg-red-600 border-2"
                      >
                        Confirm
                      </Button>
                      <Button
                        onClick={() => {
                          setConfirmationIsDialogOpen(false);
                        }}
                        className="rounded-full border-orange-400 border-2"
                      >
                        Cancel
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/*Todo: Redirect to a list of the read books this year*/}
                <Button className="rounded-full border-orange-400 border-2  cursor-not-allowed">
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
