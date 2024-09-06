"use client";

import React, { useState } from "react";
import ListsCard from "@/components/lists/ListsCard";
import ListBooksCard from "@/components/lists/ListBooksCard";
import { Book } from "@/models/book";
import { List } from "@/models/list";
export default function Page() {
  const [selectedList, setSelectedList] = useState<List | null>(null);

  return (
    <main className="h-full">
      <div className="flex justify-center p-4 bg-sky-50 h-full">
        <div className="w-1/3 p-2">
          <ListsCard
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        </div>
        <div className="w-2/3 p-2">
          <ListBooksCard list={selectedList} />
        </div>
      </div>
    </main>
  );
}
