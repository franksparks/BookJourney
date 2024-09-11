"use client";

import { useDbUser } from "@/app/context/db-user-context";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function ListsCard() {
  const { dbUser } = useDbUser();
  const router = useRouter();

  return (
    <div className="flex flex-col justify-start rounded-xl shadow-lg shadow-orange-700 bg-orange-500 p-8 text-orange-50 h-1/3">
      <h1 className="font-light text-orange-50 text-center border-b-2">
        My Lists
      </h1>
      {!dbUser && (
        <div className="text-slate-100 text-center">
          You must register or login to create a list
        </div>
      )}
      {dbUser && (
        <div className="flex-grow overflow-y-auto">
          <Button
            className="rounded-full border-2 border-orange-500 hover:border-sky-500 block m-auto"
            onClick={() =>
              router.push("http://localhost:3000/lists?listId=READ")
            }
          >
            Read books
          </Button>
          <Button
            className="rounded-full border-2 border-orange-500 hover:border-sky-500 block m-auto"
            onClick={() =>
              router.push("http://localhost:3000/lists?listId=READING")
            }
          >
            Books you are reading
          </Button>
          <Button
            className="rounded-full border-2 border-orange-500 hover:border-sky-500 block m-auto"
            onClick={() =>
              router.push(
                "http://localhost:3000/lists?listId=WANT_TO_READ"
              )
            }
          >
            Books you want to read
          </Button>
          <Button
            className="rounded-full border-2 border-orange-500 hover:border-sky-500 block m-auto"
            onClick={() => router.push("http://localhost:3000/lists")}
          >
            All lists
          </Button>
        </div>
      )}
    </div>
  );
}
