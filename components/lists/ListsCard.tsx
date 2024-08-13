"use client";

import React, { useState, useEffect } from "react";
import { List } from "@/models/list";
import { PlusIcon } from "@radix-ui/react-icons";
import { actionGetListsByUserId, actionInsertList } from "@/actions/lists";
import { useDbUser } from "@/app/context/DbUserContext";
import { Prisma } from "@prisma/client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function ListsCard({ selectedList, setSelectedList }: any) {
  const { dbUser } = useDbUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const listId = searchParams.get('listId');
  const pathname = usePathname();
  const [lists, setLists] = useState<List[]>([]);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [newListName, setNewListName] = useState<string>("");

  // if there is a dbUser, get the lists
  useEffect(() => {
    if (dbUser && dbUser.id) {
      getLists();
    }
    if (listId) {
        setSelectedList(listId);
    }
  }, [dbUser]);

  const getLists = async () => {
    const result = await actionGetListsByUserId(dbUser!.id);
    setLists(result);
  };

  const handleAddList = () => {
    setShowInput(true);
  };

  const handleCreateList = async () => {
    if (newListName.trim() === "") return;
    const newList: Prisma.ListCreateInput = {
      name: newListName,
      createdAt: new Date(),
      user: dbUser,
    };
    await actionInsertList(newList, dbUser!.id);
    setNewListName("");
    setShowInput(false);
    getLists();
  };

  const handleSelectList = (id: string) => {
    if (pathname === "/") {
        router.push(`/lists?listId=${id}`);
    } else {
        setSelectedList(id);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">My Lists</h2>
      <ul className="mb-4">
        {lists.map((list) => (
          <li
            key={list.id}
            onClick={() => handleSelectList(list.id)}
            className={`p-2 cursor-pointer transition-colors duration-300 hover:bg-gray-200 ${
              selectedList === list.id ? "font-bold" : ""
            }`}
          >
            {list.name} - ({list.books.length})
          </li>
        ))}
      </ul>
      {showInput && (
        <div className="mb-4">
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Enter list name"
            className="p-2 border rounded w-full mb-2"
          />
          <button
            onClick={handleCreateList}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300 w-full"
          >
            Create List
          </button>
        </div>
      )}
      {pathname.includes("/lists") && (
        <div className="flex justify-end">
          <button
            aria-label="add"
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
            onClick={handleAddList}
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
