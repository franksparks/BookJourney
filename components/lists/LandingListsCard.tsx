"use client";

import { useDbUser } from "@/app/context/db-user-context";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function ListsCard() {
  const { dbUser } = useDbUser();
  const router = useRouter();

  return (
    <div className="flex flex-col justify-start rounded-xl shadow-lg shadow-orange-700 bg-orange-500 p-6 text-orange-50 h-1/3">
      <h1 className="font-light text-orange-50 text-center">My Lists</h1>
      {!dbUser && (
        <div className="text-slate-100 text-center">
          You must register or login to create a list
        </div>
      )}
      {dbUser && (
        <div className="flex flex-col w-full h-full justify-evenly">
          <div className="flex flex-row justify-around">
            <Button
              className="w-56 text-lg p-6 shadow-lg rounded-full border-2 border-orange-500 hover:border-sky-600"
              onClick={() =>
                router.push("http://localhost:3000/lists?listId=READ")
              }
            >
              Read books
            </Button>
            <Button
              className="w-56 text-lg p-6 shadow-lg rounded-full border-2 border-orange-500 hover:border-sky-600"
              onClick={() =>
                router.push("http://localhost:3000/lists?listId=READING")
              }
            >
              Books you are reading
            </Button>
          </div>
          <div className="flex flex-row justify-around">
            <Button
              className="w-56 text-lg p-6 shadow-lg rounded-full border-2 border-orange-500 hover:border-sky-600"
              onClick={() =>
                router.push("http://localhost:3000/lists?listId=WANT_TO_READ")
              }
            >
              Books you want to read
            </Button>
            <Button
              className="w-56 text-lg p-6 shadow-lg rounded-full border-2 border-orange-500 hover:border-sky-600"
              onClick={() => router.push("http://localhost:3000/lists")}
            >
              All lists
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
