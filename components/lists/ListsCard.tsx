"use client";

import React, { useState, useEffect } from "react";
import { List } from "@/models/list";
import { PlusIcon, Cross2Icon } from "@radix-ui/react-icons";
import {
  actionGetListsByUserId,
  actionInsertList,
  actionGetListById,
} from "@/actions/lists";
import { useDbUser } from "@/app/context/DbUserContext";
import { Prisma } from "@prisma/client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function ListsCard({ selectedList, setSelectedList }: any) {
  const { dbUser } = useDbUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const listId = searchParams.get("listId");
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
      getListById(listId);
    }
  }, [dbUser]);

  const getListById = async (listId: string) => {
    const result = await actionGetListById(listId);
    setSelectedList(result);
  };

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

  const handleSelectList = (list: List) => {
    if (pathname === "/") {
      router.push(`/lists?listId=${list.id}`);
    } else {
      setSelectedList(list);
    }
  };

  const handleCloseInput = () => {
    setShowInput(false);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">My Lists</h2>
      <ul className="mb-4">
        {lists.map((list) => (
          <li
            key={list.id}
            onClick={() => handleSelectList(list)}
            className={`p-2 cursor-pointer transition-colors duration-300 hover:bg-gray-200 ${
              selectedList?.id === list.id ? "font-bold" : ""
            }`}
          >
            {list.name} - ({list.books.length})
          </li>
        ))}
      </ul>
      {showInput && (
        <div className="mb-4 flex items-center space-x-2">
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Enter list name"
            className="p-2 border rounded w-full"
          />
          <button
            onClick={handleCreateList}
            className="bg-orange-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 w-52 pt-2 pb-2"
          >
            Create List
          </button>
        </div>
      )}
      <div className="flex justify-end">
        {showInput ? (
          <button
            aria-label="close"
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
            onClick={handleCloseInput}
          >
            <Cross2Icon className="h-5 w-5" />
          </button>
        ) : (
          pathname.includes("/lists") && (
            <button
              aria-label="add"
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
              onClick={handleAddList}
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          )
        )}
      </div>
    </div>
  );
}
