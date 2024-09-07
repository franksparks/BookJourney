"use client";

import { actionGetListsByUserId } from "@/actions/lists";
import { useDbUser } from "@/app/context/db-user-context";
import { BookList } from "@/models/book-list";
import { List } from "@/models/list";
import { useEffect, useState } from "react";

export default function UserLists() {
  const { dbUser } = useDbUser();

  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    getLists();
  }, [dbUser]);

  const getLists = async () => {
    if (dbUser != null) {
      const userLists = await actionGetListsByUserId(dbUser.id);

      setLists(userLists);
    }
  };

  //TODO: Add a loading for this component

  return (
    <div className="flex flex-col justify-start rounded-3xl shadow-xl h-1/3 shadow-orange-200 p-4 bg-orange-500 text-orange-100">
      <h1 className="font-light text-orange-100 text-center">My Lists</h1>

      {dbUser &&
        lists.map((list: List, index) => (
          <div
            key={index}
            className=" m-2 border rounded-lg border-white p-4 shadow shadow-white hover:bg-orange-600 hover:scale-105 transition duration-500"
          >
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
      {dbUser && lists.length == 0 && (
        <div>Create a list to store books!</div>
      )}
      {!dbUser && <div>Login to see your lists here!</div>}
    </div>
  );
}
