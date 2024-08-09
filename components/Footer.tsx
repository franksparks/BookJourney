"use client";

import { useDbUser } from "@/app/context/DbUserContext";
import React from "react";

export default function Footer() {
  const { dbUser } = useDbUser();

  return (
    <div className="bg-slate-400 h-20">
      <h1>Usuario Actual:</h1>
      {dbUser && <p>{dbUser.id}</p>}
    </div>
  );
}
