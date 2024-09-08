"use client";

import ListBooksCard from "@/components/lists/ListBooksCard";
import ListsCard from "@/components/lists/ListsCard";
import { List } from "@/models/list";
import { useState } from "react";
export default function Page() {
  const [selectedList, setSelectedList] = useState<List | null>(null);

  return (
    <main className="p-2 bg-sky-50 h-full">
      <div className="flex justify-center gap-12 p-4 bg-sky-50 h-full w-full ">
        <div className="w-5/12 p-2">
          <ListsCard
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        </div>
        <div className="w-5/12 p-2">
          <ListBooksCard list={selectedList} />
        </div>
      </div>
    </main>
  );
}
