"use client";

import React, { createContext, useContext, useState } from "react";

const BooksSearchContext = createContext();

export const BooksSearchProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [resetRadio, setResetRadio] = useState(true);
  const [previewSearch, setPreviewSearch] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  return (
    <BooksSearchContext.Provider
      value={{
        results,
        setResults,
        resetRadio,
        setResetRadio,
        previewSearch,
        setPreviewSearch,
        totalItems,
        setTotalItems
      }}
    >
      {children}
    </BooksSearchContext.Provider>
  );
};

export const useBooksSearchContext = () => useContext(BooksSearchContext);
