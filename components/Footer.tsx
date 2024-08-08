"use client";

import { useDbUser } from "@/app/context/DbUserContext";
import React from "react";

export default function Footer() {
  const { dbUser } = useDbUser();
  console.log(dbUser);

  return (
    <div>
      <h1>Usuario Actual:</h1>
      {dbUser && (
        <>
          <p>{dbUser.id}</p>
        </>
      )}
    </div>
  );
}
