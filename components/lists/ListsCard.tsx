"use client";

import { actionGetBookStatusCountByUserId } from "@/actions/book-status";
import {
  actionCapitalizeAndReplaceUnderscores,
  actionDeleteList,
  actionGetListByNameAndUserId,
  actionGetListsBookCountByUserId,
  actionInsertList,
  actionUpdateList,
} from "@/actions/lists";
import { useDbUser } from "@/app/context/db-user-context";
import Modal from "@/components/ui/confirmation-modal";
import { List } from "@/models/list";
import { Prisma, ReadStatus } from "@prisma/client";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Tooltip } from "@mui/material";
import ReadStatusIcon from "../../assets/read_status.png";
import ReadingStatusIcon from "../../assets/reading_status.png";
import AbandonedStatusIcon from "../../assets/abandoned_status.png";
import WantToReadStatusIcon from "../../assets/want_to_read_status.png";
import BookGif from "../../assets/book-gif.gif";

interface ListsCardProps {
  lists: List[];
  setLists: (lists: List[]) => void;
  selectedList: List | null;
  setSelectedList: (list: List | null) => void;
}

export default function ListsCard({
  lists,
  setLists,
  selectedList,
  setSelectedList,
}: ListsCardProps) {
  const { dbUser } = useDbUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const listId = searchParams!.get("listId");
  const pathname = usePathname();
  const [showInput, setShowInput] = useState<boolean>(false);
  const [newListName, setNewListName] = useState<string>("");
  const [editingListId, setEditingListId] = useState<string | null>(null);
  const [editingListName, setEditingListName] = useState<string>("");
  const [deletingListId, setDeletingListId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Before calling getLists timeout avoid multiple calls if dbUser changes a lot of times
    const timeoutId = setTimeout(() => {
      if (dbUser && dbUser.id) {
        getLists();
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dbUser]);

  useEffect(() => {
    setErrorMessage(null);
  }, [newListName, editingListName]);

  const getLists = async () => {
    const listsResult = await actionGetListsBookCountByUserId(dbUser!.id);
    const statusResult = await actionGetBookStatusCountByUserId(dbUser!.id);
    const allLists: List[] = [];
    for (const bookStatus of statusResult) {
      allLists.push({
        id: bookStatus.status,
        name: actionCapitalizeAndReplaceUnderscores(bookStatus.status),
        createdAt: new Date(),
        userId: dbUser!.id,
        books: [],
        book_count: bookStatus._count.status,
      });
    }
    allLists.push({
      id: "--divider--",
      name: "--divider--",
      createdAt: new Date(),
      userId: dbUser!.id,
      books: [],
    });
    for (const list of listsResult) {
      allLists.push({
        ...list,
        book_count: list._count.books,
      });
    }
    handlePreselectedList(allLists);
    setLists(allLists);
  };

  const handlePreselectedList = (allLists: List[]) => {
    if (listId) {
      const foundSelected = allLists.find((list) => list.id === listId);
      if (foundSelected) {
        setSelectedList(foundSelected);
      }
    } else {
      if (allLists.length > 0) {
        setSelectedList(allLists[0]);
      }
    }
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
    const existing = await actionGetListByNameAndUserId(
      newListName,
      dbUser!.id
    );
    if (existing) {
      setErrorMessage("List already exists");
      return;
    }
    await actionInsertList(newList, dbUser!.id);
    setNewListName("");
    setShowInput(false);
    getLists();
  };

  const handleSelectList = (list: List) => {
    router.push(`/lists?listId=${list.id}`);
    if (pathname !== "/") {
      setSelectedList(list);
    }
  };

  const handleEditList = (list: List) => {
    setEditingListId(list.id);
    setEditingListName(list.name);
  };

  const handleSaveEdit = async () => {
    if (editingListName.trim() === "") return;
    const existing = await actionGetListByNameAndUserId(
      editingListName,
      dbUser!.id
    );
    if (existing) {
      setErrorMessage("List already exists");
      return;
    }
    const result = await actionUpdateList(editingListId!, editingListName);
    if (selectedList?.id === editingListId) {
      setSelectedList(result);
    }
    setEditingListId(null);
    setEditingListName("");
    setLists(lists.map((list) => (list.id === editingListId ? result : list)));
  };

  const handleCancelEdit = () => {
    setEditingListId(null);
    setEditingListName("");
  };

  const handleDeleteList = async (id: string) => {
    setDeletingListId(id);
  };

  const confirmDeleteList = async () => {
    if (deletingListId) {
      await actionDeleteList(deletingListId);
      setLists(lists.filter((list) => list.id !== deletingListId));
      if (selectedList?.id === deletingListId) {
        setSelectedList(lists[0]);
      }
      setDeletingListId(null);
    }
  };

  const cancelDeleteList = () => {
    setDeletingListId(null);
  };

  const handleCloseInput = () => {
    setShowInput(false);
  };

  const handleEditListName = (e: ChangeEvent<HTMLInputElement>) => {
    if (editingListName.length === 50 && e.target.value.length > 50) {
      setErrorMessage("List name must be less than 50 characters");
      return;
    }
    setEditingListName(e.target.value);
  };

  const handleEditNewListName = (e: ChangeEvent<HTMLInputElement>) => {
    if (newListName.length === 50) {
      setErrorMessage("List name must be less than 50 characters");
      return;
    }
    setNewListName(e.target.value);
  };

  return (
    <div className="flex flex-col justify-start rounded-xl shadow-lg shadow-sky-600 bg-sky-600 p-8  h-full">
      <h1 className="font-light text-orange-50 text-center border-b-2">
        My Lists
      </h1>

      <>
        <ul className="flex-grow overflow-y-auto">
          {lists.length > 0 &&
            lists.map((list) =>
              list.id === "--divider--" ? (
                <hr key={list.id} className={`mb-4`} />
              ) : (
                <div
                  className={`text-white items-center mb-4 ${
                    pathname === "/" &&
                    !Object.values(ReadStatus).includes(list.id as ReadStatus)
                      ? "hidden"
                      : "flex"
                  }`}
                  key={list.id}
                >
                  {editingListId === list.id ? (
                    <div className="w-full">
                      <div className="flex items-center mb-4">
                        <input
                          type="text"
                          value={editingListName}
                          onChange={handleEditListName}
                          className="p-2 border rounded w-full"
                        />
                        <button
                          aria-label="close"
                          className="p-2 bg-green-500 text-white rounded-full hover:bg-green-800 transition-colors duration-300 ml-3 mr-3"
                          onClick={handleSaveEdit}
                        >
                          <CheckIcon className="h-3 w-3" />
                        </button>
                        <button
                          aria-label="close"
                          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                          onClick={handleCancelEdit}
                        >
                          <Cross2Icon className="h-3 w-3" />
                        </button>
                      </div>
                      {errorMessage && (
                        <p className="text-red-600">{errorMessage}</p>
                      )}
                    </div>
                  ) : (
                    <>
                    {Object.values(ReadStatus).includes(
                          list.id as ReadStatus
                        ) ? (
                          <img
                            src={
                              list.id === ReadStatus.READ
                                ? ReadStatusIcon.src
                                : list.id === ReadStatus.READING
                                ? ReadingStatusIcon.src
                                : list.id === ReadStatus.WANT_TO_READ
                                ? WantToReadStatusIcon.src
                                : AbandonedStatusIcon.src
                            }
                            className="h-10 w-10"
                          />
                        ) : <img src={BookGif.src} className="h-7 w-7 mr-3" />}
                      <Tooltip
                        title={`${list.name} - (${list.book_count ?? 0})`}
                        placement="top"
                      >
                        <li
                          onClick={() => handleSelectList(list)}
                          className={`truncate w-full transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none hover:cursor-pointer ${
                            selectedList?.id === list.id ? "font-bold" : ""
                          }`}
                        >
                          {list.name} - ({list.book_count ?? 0})
                        </li>
                      </Tooltip>
                      {!Object.values(ReadStatus).includes(
                        list.id as ReadStatus
                      ) && (
                        <Button onClick={() => handleEditList(list)}>
                          Edit List
                        </Button>
                      )}
                      {!Object.values(ReadStatus).includes(
                        list.id as ReadStatus
                      ) && (
                        <Button
                          variant={"destructive"}
                          onClick={() => handleDeleteList(list.id)}
                        >
                          Delete List
                        </Button>
                      )}
                    </>
                  )}
                </div>
              )
            )}
          {lists.length === 0 && (
            <p className="text-white">User has no lists.</p>
          )}
        </ul>
        <div className="flex">
          {showInput ? (
            <>
              <div className="mb-4 flex items-center w-full">
                <input
                  type="text"
                  value={newListName}
                  onChange={handleEditNewListName}
                  placeholder="Enter list name"
                  className="p-2 border rounded max-w-80"
                />
                <button
                  aria-label="close"
                  className="p-2 bg-green-500 text-white rounded-full hover:bg-green-800 transition-colors duration-300 ml-auto mr-3"
                  onClick={handleCreateList}
                >
                  <CheckIcon className="h-3 w-3" />
                </button>
                <button
                  aria-label="close"
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                  onClick={handleCloseInput}
                >
                  <Cross2Icon className="h-3 w-3" />
                </button>
              </div>
              {errorMessage && (
                <label className="text-red-600">{errorMessage}</label>
              )}
            </>
          ) : (
            <div className="ml-auto mt-2">
              {pathname.includes("/lists") && (
                <Button onClick={handleAddList}>New list</Button>
              )}
            </div>
          )}
        </div>
      </>
      <Modal
        isOpen={!!deletingListId}
        onClose={cancelDeleteList}
        onConfirm={confirmDeleteList}
        title="Confirm Deletion"
        message="Are you sure you want to delete this list? This action cannot be undone."
      />
    </div>
  );
}
