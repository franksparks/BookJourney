"use client";

import { useDbUser } from "@/app/context/DbUserContext";
import React from "react";
import { useUser } from "@clerk/nextjs";

export default function Footer() {
  const { dbUser } = useDbUser();
  const { user } = useUser();

  return (
    <div className="bg-sky-600 h-50 text-white p-2">
      <h1>Usuario Actual:</h1>
      {user && <p>Hi, {user.firstName}</p>}
      {dbUser && <p>{dbUser.id}</p>}
    </div>
  );
}
