import {
  actionGetListsByBookIdAndUserId,
  actionGetListsByUserId,
} from "@/actions/lists";
import { useDbUser } from "@/app/context/db-user-context";
import { Book } from "@/models/book";
import { List } from "@/models/list";
import React, { useEffect, useState } from "react";

type BookToListInjectorProps = {
  book: Book;
};

export default function BookToListInjector({
  book,
}: BookToListInjectorProps) {
  const { dbUser } = useDbUser();
  const [currentUserLists, setUserLists] = useState<List[] | null>(null);
  const [currentBookLists, setBookLists] = useState<List[] | null>(null);

  useEffect(() => {
    getUserLists();
    getBookLists();
  }, [dbUser, currentUserLists, currentBookLists]);

  const getUserLists = async () => {
    const userLists = dbUser
      ? await actionGetListsByUserId(dbUser.id!)
      : null;
    setUserLists(userLists?.length ? userLists : null);
  };

  const getBookLists = async () => {
    const bookLists = dbUser
      ? await actionGetListsByBookIdAndUserId(book.id!, dbUser.id!)
      : null;
    setBookLists(bookLists?.length ? bookLists : null);
  };
  return (
    <div>
      <p>User lists:</p>
      <ul>
        {currentUserLists && currentUserLists.length > 0 ? (
          <>
            User has the next{" "}
            {currentUserLists.length === 1 ? "list" : "lists"}:
            {currentUserLists.map((list: List, index) => (
              <li key={index}>{list.name}</li>
            ))}
          </>
        ) : (
          <p>User added no list yet.</p>
        )}
      </ul>
      <p>Book stored:</p>
      <ul>
        {currentBookLists && currentBookLists.length > 0 ? (
          <>
            Book is stored on{" "}
            {currentBookLists.length === 1 ? "this list" : "these lists"}:
            {currentBookLists.map((list: List, index) => (
              <li key={index}>{list.name}</li>
            ))}
          </>
        ) : (
          <p>Book not added to any list yet.</p>
        )}
      </ul>
    </div>
  );
}
