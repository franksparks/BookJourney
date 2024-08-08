"use client";

import { actionInsertUser } from "@/actions/users";
import { useDbUser } from "@/app/context/DbUserContext";
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

export default function Header() {
  const { user } = useUser();
  const router = useRouter();
  const { setDbUser } = useDbUser();

  useEffect(() => {
    if (user != null) {
      actionInsertUser(user.id, user.emailAddresses[0].emailAddress);
      setDbUser(user);
    } else {
      setDbUser(null);
    }
  }, [user, setDbUser]);

  return (
    <header className="h-16 w-full bg-sky-700">
      <div className="mx-12 flex items-center justify-between h-full">
        <div className="flex items-center gap-x-3">
          <div
            onClick={() => router.push("/")}
            className="flex items-center gap-x-1 cursor-pointer"
          >
            <h1 className="text-white text-3xl font-thin">book</h1>
            <h1 className="text-orange-500 text-3xl tracking-wide">
              journey
            </h1>
          </div>
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
