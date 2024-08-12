"use client";

import React, { useState } from "react";
import styles from "@/styles/lists.module.css";
import { Card } from "@mui/material"
export default function page() {
    const [selectedList, setSelectedList] = useState<string | null>(null);
  
    const lists = [
    { id: "1", name: "Favoritos", bookCount: 5 },
    { id: "2", name: "Por leer", bookCount: 3 },
    { id: "3", name: "Leídos", bookCount: 8 },
  ];

  const books: any = {
    "1": ["Libro 1", "Libro 2", "Libro 3", "Libro 4", "Libro 5"],
    "2": ["Libro 6", "Libro 7", "Libro 8"],
    "3": [
      "Libro 9",
      "Libro 10",
      "Libro 11",
      "Libro 12",
      "Libro 13",
      "Libro 14",
      "Libro 15",
      "Libro 16",
    ],
  };
  return (
    <main>
      <div className={styles.container}>
        <Card className={styles.listsColumn}>
          <h2>Mis Listas</h2>
          <ul>
            {lists.map((list) => (
              <li
                key={list.id}
                onClick={() => setSelectedList(list.id)}
                className={styles.listItem}
              >
                {list.name} - ({list.bookCount})
              </li>
            ))}
          </ul>
        </Card>
        <Card className={styles.booksColumn}>
          <h2>
            Libros en{" "}
            {selectedList
              ? lists.find((list) => list.id === selectedList)?.name
              : "Selecciona una lista"}
          </h2>
          {selectedList && (
            <ul className={styles.bookList}>
              {books[selectedList]?.map((book: any, index: number) => (
                <li className={styles.bookItem} key={index}>{book}</li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </main>
  );
}
