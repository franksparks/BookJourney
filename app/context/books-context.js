"use client"

import React, { createContext, useContext, useState } from 'react';

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
    const [results, setResults] = useState([]);

    return (
        <BooksContext.Provider value={{results, setResults}}>
            {children}
        </BooksContext.Provider>
    );
};

export const useBooksContext = () => useContext(BooksContext);