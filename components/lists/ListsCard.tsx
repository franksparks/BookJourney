"use client";

import React, { useState, useEffect } from "react";
import { Card, IconButton } from "@mui/material";
import styles from "@/styles/lists.module.css";
import { List } from "@/models/list";
import AddIcon from '@mui/icons-material/Add';

export default function ListsCard() {
    const [lists, setLists] = useState<List[]>([]);
    const [selectedList, setSelectedList] = useState<string | null>(null);

    const handleSelectList = (id: string) => {
        setSelectedList(id);
    }
    return <Card className={styles.listsColumn}>
    <h2>My Lists</h2>
    <ul>
      {lists.map((list) => (
        <li
          key={list.id}
          onClick={() => handleSelectList(list.id)}
          className={styles.listItem}
        >
          {list.name} - ({list.bookCount})
        </li>
      ))}
    </ul>
    <div>
    <IconButton 
        aria-label="add" 
        className={styles.addButton} 
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <AddIcon />
      </IconButton>
    </div>
  </Card>;
}