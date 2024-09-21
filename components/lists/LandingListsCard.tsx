"use client";

import { useDbUser } from "@/app/context/db-user-context";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import ReadStatusIcon from "../../assets/icons/read.svg";
import ReadingStatusIcon from "../../assets/icons/reading.svg";
import WantToReadStatusIcon from "../../assets/icons/pending.svg";

export default function ListsCard() {
  const { dbUser } = useDbUser();
  const router = useRouter();

  return (
    <div className="flex flex-col justify-start rounded-xl shadow-lg shadow-orange-700 bg-orange-500 pl-8 pr-8 pt-4 text-orange-50 h-1/3">
      <h1 className="font-light text-orange-50 text-center border-b-2">
        My Lists
      </h1>
      {!dbUser && (
        <div className="flex flex-col justify-center items-center h-full w-full">
          <p className="mb-2">Login to create and view lists!</p>
        </div>
      )}
      {dbUser && (
        <div className="grid grid-cols-2 gap-4 w-full h-full place-content-evenly">
          <Button
            className="text-lg p-6 w-full"
            onClick={() => router.push("/lists?listId=READ")}
          >
            <img src={ReadStatusIcon.src} className="w-6 h-6 mr-2"/>
            Read books
          </Button>
          <Button
            className="text-lg p-6 w-full"
            onClick={() => router.push("/lists?listId=READING")}
          >
            <img src={ReadingStatusIcon.src} className="w-6 h-6 mr-2"/>
            Books you are reading
          </Button>
          <Button
            className="text-lg p-6 w-full"
            onClick={() => router.push("/lists?listId=WANT_TO_READ")}
          >
            <img src={WantToReadStatusIcon.src} className="w-6 h-6 mr-2"/>
            Books you want to read
          </Button>
          <Button
            className="text-lg p-6 w-full"
            onClick={() => router.push("/lists")}
          >
            All lists
          </Button>
        </div>
      )}
    </div>
  );
}
