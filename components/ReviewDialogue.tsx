import { Button } from "./ui/button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { useCallback, useEffect, useState } from "react";
import { TextareaAutosize } from "@mui/material";
import { Review } from "@/models/review";
import { Book, DbBook } from "@/models/book";
import {
  actionDeleteReview,
  actionGetReviewByGoogleBookIdAndUserId,
  actionInsertReview,
  actionUpdateReview,
} from "@/actions/reviews";
import { actionGetBookByGoogleId } from "@/actions/books";

type ReviewDialogueProps = {
  bookInDb: Book | DbBook | null;
  dbUser: any;
  numericBookRating: number | null;
  bookReview: Review | null;
  setBookReview: (review: Review | null) => void;
};

export default function ReviewDialogue({
  bookInDb,
  dbUser,
  numericBookRating,
  bookReview,
  setBookReview,
}: ReviewDialogueProps) {
  const [commentBookReview, setCommentBookReview] = useState<string>("");
  const [open, setOpen] = useState(false);

  const fetchReview = useCallback(async () => {
    
    let review: Review | null;

    if(dbUser && "reviews" in bookInDb! && (bookInDb as DbBook).reviews!== undefined) {

      const result = (bookInDb as DbBook).reviews.filter(review => review.userId == dbUser.id)
      review = result[0];
      if (review) {
        setBookReview(review);
        setCommentBookReview(review.comment);
      }
    } else if (dbUser && bookInDb) {
      review = await actionGetReviewByGoogleBookIdAndUserId(
        bookInDb!.googleBooksId,
        dbUser.id
      );
      if (review) {
        setBookReview(review);
        setCommentBookReview(review.comment);
      }
    }
  }, [dbUser, bookInDb, bookReview, commentBookReview]);

  const saveReview = useCallback(async () => {

    let book: Book;
    if(bookInDb?.id === undefined) {
      book = await actionGetBookByGoogleId(bookInDb?.googleBooksId!)
      console.log(book)
    } else {
      book = bookInDb;
      console.log(book)
    }
    if (bookReview === null || bookReview === undefined) {
      const review = await actionInsertReview(
        commentBookReview,
        book.id!,
        dbUser?.id
      );
      setBookReview(review);
      setCommentBookReview(review.comment);
    } else {
      const review = await actionUpdateReview(
        bookReview.id!,
        commentBookReview
      );
      setBookReview(review);
    }
  }, [commentBookReview]);

  const deleteReview = useCallback(async () => {
    if (bookReview) {
      await actionDeleteReview(bookReview?.id!);
      setBookReview(null);
      setCommentBookReview("");
    }
  }, [bookReview]);

  const handleTextChange = (event: { target: { value: string } }) => {
    setCommentBookReview(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
    saveReview();
  };

  const handleDelete = () => {
    setOpen(false);
    deleteReview();
  };

  useEffect(() => {
    fetchReview();
    if (numericBookRating === null) {
      deleteReview();
    }
  }, [bookInDb, numericBookRating]);

  return (
    <>
      <Button className="cursor-pointer" onClick={handleClickOpen}>
        {bookReview === null ? "Write a review" : "Edit your review"}
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <TextareaAutosize
          className="m-2 p-4"
          minRows={10}
          placeholder="Add your review here"
          value={commentBookReview}
          onChange={handleTextChange}
        ></TextareaAutosize>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          {bookReview && <Button onClick={handleDelete}>Delete</Button>}
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
