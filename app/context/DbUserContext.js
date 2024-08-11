"use client";

import React, { createContext, useContext, useState } from "react";

const DbUserContext = createContext();

// Crear el proveedor del contexto
export const DbUserProvider = ({ children }) => {
  const [dbUser, setDbUser] = useState(null);

  return (
    <DbUserContext.Provider value={{ dbUser, setDbUser }}>
      {children}
    </DbUserContext.Provider>
  );
};

// Crear un hook personalizado para usar el contexto
export const useDbUser = () => useContext(DbUserContext);
