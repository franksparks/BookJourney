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

  return (
    <div>
      <h1>UserLists</h1>
      <div>
        {lists.map((list, index) => (
          <div key={index}>
            {list.name} ({list.books.length} book/s)
          </div>
        ))}
      </div>
    </div>
  );
}
