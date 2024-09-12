import { actionUpdateBookLists } from "@/actions/book-list";
import {
  actionGetBookByGoogleId,
  actionInsertBook,
} from "@/actions/books";
import {
  actionGetListsByBookIdAndUserId,
  actionGetListsByUserId,
} from "@/actions/lists";
import { useDbUser } from "@/app/context/db-user-context";
import { DbBook, Book } from "@/models/book";
import { List } from "@/models/list";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Tooltip } from "@mui/material";

type BookToListInjectorProps = {
  book: DbBook | Book;
};

export default function BookToListInjector({
  book,
}: BookToListInjectorProps) {
  const { dbUser } = useDbUser();
  const [userLists, setUserLists] = useState<List[] | null>(null);
  const [bookLists, setBookLists] = useState<List[] | null>(null);
  const [selectedLists, setSelectedLists] = useState<Set<string>>(
    new Set()
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const logged = dbUser ? true : false;

  useEffect(() => {
    if (dbUser) {
      getUserLists();
      getBookLists();
    }
  }, [dbUser, book]);

  const getUserLists = async () => {
    const userLists = dbUser
      ? await actionGetListsByUserId(dbUser.id!)
      : null;
    setUserLists(userLists?.length ? userLists : null);
  };

  const getBookLists = async () => {
    const dbBook: DbBook = await actionGetBookByGoogleId(book.googleBooksId);

    if (dbBook) {
      const bookLists = dbUser
        ? await actionGetListsByBookIdAndUserId(dbBook.id!, dbUser.id!)
        : null;

      const selected = new Set<string>(
        bookLists.map((list: List) => list.id)
      );

      setBookLists(bookLists?.length ? bookLists : null);
      setSelectedLists(selected);
    } else {
      setBookLists(null);
    }
  };

  const toggleListSelection = (listId: string) => {
    setSelectedLists((prev) => {
      const updated = new Set(prev);
      if (updated.has(listId)) {
        updated.delete(listId);
      } else {
        updated.add(listId);
      }
      return updated;
    });
  };

  const saveChanges = async () => {
    if (book.id === undefined) {
      const dbBook = await actionGetBookByGoogleId(book.googleBooksId);

      if (dbBook === null) {
        const newBook = await actionInsertBook(book as Book);

        await actionUpdateBookLists(
          newBook.id!,
          Array.from(selectedLists)
        );
      }
    } else {
      await actionUpdateBookLists(book.id, Array.from(selectedLists));
    }
    await getBookLists();
    setIsDialogOpen(false);
  };

  return (
    <div>
      {logged && (
        <ul>
          {bookLists && bookLists.length > 0 ? (
            <>
              <p className="mt-2">
                Book stored on{" "}
                {bookLists.length === 1 ? "this list" : "these lists"}:
              </p>

              {bookLists.map((list: List, index) => (
                <li className=" flex justify-center mt-2" key={index}>
                  {list.name}
                </li>
              ))}
            </>
          ) : (
            <p>Book not added to any list yet.</p>
          )}
        </ul>
      )}
      <div className="flex justify-center mt-4">
        {dbUser === null ? (
          <Tooltip title="Login to perform this action." arrow>
            <span>
              <Button disabled={!logged}>Manage lists</Button>
            </span>
          </Tooltip>
        ) : (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={!logged}>Manage lists</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Manage Lists</DialogTitle>
              </DialogHeader>
              <ul>
                {userLists && userLists.length > 0 ? (
                  userLists.map((list) => (
                    <li key={list.id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedLists.has(list.id)}
                          onChange={() => toggleListSelection(list.id)}
                        />
                        {list.name}
                      </label>
                    </li>
                  ))
                ) : (
                  <p>No lists available.</p>
                )}
              </ul>
              <DialogFooter>
                <Button onClick={saveChanges}>Save</Button>
                <Button
                  variant={"cancel"}
                  onClick={() => {
                    setIsDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
