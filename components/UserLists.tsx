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
    <div>
      <h1>My lists of books</h1>
      <div>
        {dbUser &&
          lists.map((list, index) => (
            <div key={index}>
              {list.name} ({list.books.length} book
              {list.books.length !== 1 && "s"})
            </div>
          ))}
        {dbUser && lists.length == 0 && (
          <div>Create a list to store books!</div>
        )}
        {!dbUser && <div>Login to see your lists here!</div>}
      </div>
    </div>
  );
}
