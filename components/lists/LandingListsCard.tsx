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
        <div className="flex flex-col justify-center items-center h-full w-full">
          <p className="mb-2">Login to create and view lists!</p>
        </div>
      )}
      {dbUser && (
        <div className="flex flex-col w-full h-full justify-evenly">
          <div className="flex flex-row justify-around">
            <Button
              className="text-lg p-6"
              onClick={() => router.push("/lists?listId=READ")}
            >
              Read books
            </Button>
            <Button
              className="text-lg p-6"
              onClick={() => router.push("/lists?listId=READING")}
            >
              Books you are reading
            </Button>
          </div>
          <div className="flex flex-row justify-around">
            <Button
              className="text-lg p-6"
              onClick={() => router.push("/lists?listId=WANT_TO_READ")}
            >
              Books you want to read
            </Button>
            <Button
              className="text-lg p-6"
              onClick={() => router.push("/lists")}
            >
              All lists
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
