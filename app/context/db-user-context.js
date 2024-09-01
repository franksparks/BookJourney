"use client";

import React, { createContext, useContext, useState } from "react";

const DbUserContext = createContext();

export const DbUserProvider = ({ children }) => {
  const [dbUser, setDbUser] = useState(null);

  return (
    <DbUserContext.Provider value={{ dbUser, setDbUser }}>
      {children}
    </DbUserContext.Provider>
  );
};

export const useDbUser = () => useContext(DbUserContext);
