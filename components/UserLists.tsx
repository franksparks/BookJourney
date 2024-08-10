"use client";

import { actionGetListsByUserId } from "@/actions/lists";
import { useDbUser } from "@/app/context/DbUserContext";
import { useEffect, useState } from "react";

import { List } from "@/db/lists";
import { Book } from "@/db/books";
import { BookList } from "@/db/book-list";

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
        lists.map((list: List, index) => (
          <div
            key={index}
            className="rounded-3xl shadow-xl shadow-sky-200 p-8 bg-sky-600 text-slate-200 min-w-80"
          >
            <h1 className="font-light text-sky-300">{list.name}</h1>

            <div>
              {list.books.length == 0 && (
                <p>There are no books in this list.</p>
              )}
              {list.books.map((bookList: BookList, index) => (
                <div key={index}>
                  <p>{bookList.book.title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      {dbUser && lists.length == 0 && (
        <div>Create a list to store books!</div>
      )}
      {!dbUser && <div>Login to see your lists here!</div>}
    </div>
  );
}
