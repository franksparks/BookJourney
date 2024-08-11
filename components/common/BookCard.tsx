import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { BookCardProps } from "@/models/auxiliar";
import styles from "@/styles/bookcard.module.css";

export default function BookCard({ book }: { book: BookCardProps }) {
  return (
    <Card className={styles.card}>
      <div className={styles.media}>
        <img
          src={book.smallThumbnail}
          alt={book.title}
          className={styles.thumb}
        />
      </div>
      <div className={styles.details}>
        <CardContent className={styles.content}>
          <Typography component="div" variant="h5" className={styles.title}>
            {book.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            component="div"
            className={styles.authors}
          >
            <strong>Authors:</strong> {book.authors.join(", ")}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            component="div"
            className={styles.publishedDate}
          >
            <strong>Genre:</strong> {book.genre}
          </Typography>
        </CardContent>
        <div className={styles.footer}>
          <Button variant="contained" color="primary" className={styles.updateButton} onClick={book.updateAction}>
            Update
          </Button>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={styles.totalPages}
          >
            <strong>Total Pages:</strong> {book.pages}
          </Typography>
        </div>
      </div>
    </Card>
  );
}
