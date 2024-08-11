"use client";

import { actionGetListsByUserId } from "@/actions/lists";
import { useDbUser } from "@/app/context/DbUserContext";
import { useEffect, useState } from "react";

import { BookList } from "@/models/bookList";
import { List } from "@/models/list";

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
    <div className="flex flex-col justify-start rounded-3xl shadow-xl shadow-orange-200 p-8 bg-orange-500 text-slate-200 w-96 h-96 overflow-y-auto">
      {dbUser &&
        lists.map((list: List, index) => (
          <div className=" m-2 border rounded-lg border-white p-4 shadow shadow-white hover:bg-orange-600 hover:scale-105 transition duration-500">
            <h1 className="font-light text-orange-100 mb-2 text-2xl">
              {list.name}
            </h1>

            <div key={index}>
              {list.books.length == 0 && (
                <p className="text-sm">There are no books in this list.</p>
              )}
              {list.books.map((bookList: BookList, index) => (
                <div key={index}>
                  <p className="text-sm">{bookList.book.title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      {dbUser && lists.length == 0 && <div>Create a list to store books!</div>}
      {!dbUser && <div>Login to see your lists here!</div>}
    </div>
  );
}
