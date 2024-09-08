"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from '@clerk/nextjs';

const DbUserContext = createContext();

export const DbUserProvider = ({ children }) => {
  const [dbUser, setDbUser] = useState(null);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      setDbUser(null);
    }
  }, [isSignedIn]);

  return (
    <DbUserContext.Provider value={{ dbUser, setDbUser }}>
      {children}
    </DbUserContext.Provider>
  );
};

export const useDbUser = () => useContext(DbUserContext);
