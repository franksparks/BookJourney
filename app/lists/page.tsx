"use client";

import React, { useState, useEffect } from "react";
import ListsCard from "@/components/lists/ListsCard";
export default function page() {
    const [selectedList, setSelectedList] = useState<string | null>(null);

    useEffect(() => {
        if (selectedList) {
            console.log("selectedList:", selectedList);
        }
    }, [selectedList])
  
  return (
    <main>
      <div className="flex justify-center p-8 flex-grow bg-sky-50 h-full">
        <ListsCard selectedList={selectedList} setSelectedList={setSelectedList}/>
      </div>
    </main>
  );
}
