"use client";

import { actionGetUserByClerkId, actionInsertUser } from "@/actions/users";
import { useDbUser } from "@/app/context/db-user-context";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PreviewSearchBox from "./PreviewSearchBox";
import { Button } from "./ui/button";
import BookGif from "../assets/book-gif.gif";

export default function Header() {
  const { user } = useUser();
  const router = useRouter();
  const { setDbUser, dbUser } = useDbUser();

  useEffect(() => {
    getLocalUser();
  }, [user]);

  const getLocalUser = async () => {
    if (user != null) {
      await actionInsertUser(user.id, user.emailAddresses[0].emailAddress);
      const MyUser = await actionGetUserByClerkId(user.id);
      setDbUser(MyUser);
    } else {
      setDbUser(null);
    }
  };

  return (
    <header className="h-16 w-full bg-sky-600">
      <div className="mx-12 flex items-center justify-between h-full">
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-x-1 cursor-pointer mt-2"
        >
          <img src={BookGif.src} className="w-11 h-11 mb-3 mr-2" />
          <h1 className="text-white text-4xl font-thin">book</h1>
          <h1 className="text-orange-500 text-4xl tracking-wide">
            journey
          </h1>
        </div>
        <PreviewSearchBox />
        <div style={{ minWidth: "150px" }}>
          <ClerkLoading>
            <Loader className="h-6 w-6 text-white animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button>Login</Button>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}
