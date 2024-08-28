"use client";

import ReadingChallengeCard from "@/components/ReadingChallengeCard";
import ReadingList from "@/components/ReadingList";
import UserLists from "@/components/UserLists";
import { useState } from "react";

export default function Home() {
  const [readBooksCount, setReadBooksCount] = useState(0);

  return (
    <main className="flex justify-center p-8 flex-grow bg-sky-50 h-full">
      <div id="Container" className="w-5/6 flex flex-row justify-center gap-20">
        <div className="w-1/2">
          <ReadingList
            onBookRead={() => setReadBooksCount((prev) => prev + 1)}
          />
        </div>
        <div className="w-1/2">
          <UserLists />
          <ReadingChallengeCard readBooksCount={readBooksCount} />
        </div>
      </div>
    </main>
  );
}
