"use client"

import React, { createContext, useContext, useState } from 'react';

const BooksSearchContext = createContext();

export const BooksSearchProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [resetRadio, setResetRadio] = useState(true);

    return (
        <BooksSearchContext.Provider value={{ results, setResults, resetRadio, setResetRadio }}>
            {children}
        </BooksSearchContext.Provider>
    );
};

export const useBooksSearchContext = () => useContext(BooksSearchContext);
