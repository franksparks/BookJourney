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
      <div>UserLists</div>
      <div>
        {lists.map((list, index) => (
          <div key={index}>{JSON.stringify(list.name)}</div>
        ))}
      </div>
    </div>
  );
}
