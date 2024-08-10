"use client";

import { actionGetListsByUserId } from "@/actions/lists";
import { useDbUser } from "@/app/context/DbUserContext";
import { useEffect, useState } from "react";

import { List } from "@/db/lists";

const initialState: List[] = [];

export default function UserLists() {
  const { dbUser } = useDbUser();

  const [lists, setLists] = useState(initialState);

  useEffect(() => {
    getLists();
  }, [dbUser]);

  const getLists = async () => {
    if (dbUser != null) {
      const userLists = await actionGetListsByUserId(dbUser.id);
      console.log(JSON.stringify(userLists));

      setLists(userLists);
    }
  };

  //TODO: Add a loading for this component

  return (
    <div className="flex flex-row gap-40">
      {dbUser &&
        lists.map((list, index) => (
          <div
            key={index}
            className="rounded-3xl shadow-xl shadow-sky-200 p-8 bg-sky-600 text-slate-200 min-w-80"
          >
            <h1 className="font-light text-sky-300">{list.name}</h1>

            {list.books.map((bookList, bookIndex) => (
              <div
                key={bookIndex}
                className="p-6 text-xl border m-4 rounded-2xl border-slate-200 shadow-sm shadow-white hover:scale-105 hover:bg-sky-500 hover:shadow hover:shadow-white transition duration-500 cursor-pointer"
              >
                {bookList.book.title}
              </div>
            ))}
          </div>
        ))}
      {dbUser && lists.length == 0 && <div>Create a list to store books!</div>}
      {!dbUser && <div>Login to see your lists here!</div>}
    </div>
  );
}
