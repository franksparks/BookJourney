"use client";

import ReadingChallengeCard from "@/components/ReadingChallengeCard";
import ReadingList from "@/components/ReadingList";
import UserLists from "@/components/UserLists";
import { useCallback, useState } from "react";
import WantToRead from "@/components/WantToRead";

export default function Home() {
  const [bookRead, setBookRead] = useState(false);
  const [bookSignal, setBookSignal] = useState(false);

  const handleBookRead = useCallback(() => {
    setBookRead(true);
  }, []);

  const handleResetBookRead = useCallback(() => {
    setBookRead(false);
  }, []);

  const newBookSignal = useCallback((bool: boolean) => {
    setBookSignal(bool);
  }, []);
  return (
    <main className="flex justify-center p-8 flex-grow bg-sky-50 h-full">
      <div id="Container" className="w-5/6 flex flex-row justify-center gap-20">
        <div className="w-1/2">
          <ReadingList
            onBookRead={handleBookRead}
            bookSignal={bookSignal}
            newBookSignal={newBookSignal}
          />
        </div>
        <div className="w-1/2 flex flex-col h-full gap-6">
          <WantToRead newBookSignal={newBookSignal} />
          <ReadingChallengeCard
            bookRead={bookRead}
            onReset={handleResetBookRead}
          />
          <UserLists />
        </div>
      </div>
    </main>
  );
}
