import {
  actionGetListsByBookIdAndUserId,
  actionGetListsByUserId,
} from "@/actions/lists";
import { useDbUser } from "@/app/context/db-user-context";
import { Book } from "@/models/book";
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
import { actionUpdateBookLists } from "@/actions/book-list";

type BookToListInjectorProps = {
  book: Book;
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

  useEffect(() => {
    if (dbUser) {
      getUserLists();
      getBookLists();
    }
  }, [dbUser]);

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
    const selected = new Set<string>(
      bookLists.map((list: List) => list.id)
    );
    setBookLists(bookLists?.length ? bookLists : null);
    setSelectedLists(selected);
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
    if (dbUser) {
      await actionUpdateBookLists(book.id!, Array.from(selectedLists));
      setIsDialogOpen(false);
    }
  };

  return (
    <div>
      <ul>
        {userLists && userLists.length > 0 ? (
          <>
            User has the next {userLists.length === 1 ? "list" : "lists"}:
            {userLists.map((list: List, index) => (
              <li key={index}>{list.name}</li>
            ))}
          </>
        ) : (
          <p>User added no list yet.</p>
        )}
      </ul>

      <ul>
        {bookLists && bookLists.length > 0 ? (
          <>
            <p>
              Book stored on{" "}
              {bookLists.length === 1 ? "this list" : "these lists"}:
            </p>

            {bookLists.map((list: List, index) => (
              <li key={index}>{list.name}</li>
            ))}
          </>
        ) : (
          <p>Book not added to any list yet.</p>
        )}
      </ul>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-full border-orange-500 border-2">
            Manage lists
          </Button>
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
            <Button
              className="rounded-full border-orange-500 border-2"
              onClick={saveChanges}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setIsDialogOpen(false);
              }}
              className="rounded-full border-orange-500 border-2"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
