"use client";

import ListBooksCard from "@/components/lists/ListBooksCard";
import ListsCard from "@/components/lists/ListsCard";
import { List } from "@/models/list";
import { useState } from "react";
export default function Page() {
  const [selectedList, setSelectedList] = useState<List | null>(null);
  const [lists, setLists] = useState<List[]>([]);

  return (
    <main className="p-2 bg-transparent h-full">
      <div className="flex justify-center p-4 bg-transparent h-full">
        <div className="w-1/3 p-2">
          <ListsCard
            lists={lists}
            setLists={setLists}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        </div>
        <div className="w-2/3 p-2">
          <ListBooksCard
            list={selectedList}
            lists={lists}
            setLists={setLists}
            setSelectedList={setSelectedList}/>
        </div>
      </div>
    </main>
  );
}
