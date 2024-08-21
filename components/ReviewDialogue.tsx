import { Button } from "./ui/button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { TextareaAutosize } from "@mui/material";
import { Review } from "@/models/review";
import { actionGetRatingByGoogleBookIdAndUserId } from "@/actions/ratings";
import { Book } from "@/models/book";
import { actionInsertReview } from "@/actions/reviews";

type ReviewDialogueProps = {
  bookInDb: Book;
  dbUser: any;
};

export default function ReviewDialogue({
  bookInDb,
  dbUser
}: ReviewDialogueProps) {
  const [bookReview, setBookReview] = useState<Review | null>(null);
  const [commentBookReview, setCommentBookReview] = useState<string>("");
  const [open, setOpen] = useState(false);

  const fetchReview = useCallback(async () => {
    if (dbUser) {
      const review: Review = await actionGetRatingByGoogleBookIdAndUserId(
        bookInDb.googleBooksId,
        dbUser.id
      );
      if (review) {
        setBookReview(review);
      }
    }
  }, [bookInDb.googleBooksId, dbUser]);

  const addReview = useCallback(async () => {
    const reviewCreateInput = {
      comment: commentBookReview,
      book: {
        connect: {
          id: bookInDb?.id
        }
      },
      user: {
        connect: {
          id: dbUser?.id
        }
      }
    };

    const review = await actionInsertReview(reviewCreateInput);
    setBookReview(review);
  }, [commentBookReview]);

  const handleTextChange = (event: {
    target: { value: string };
  }) => {
      setCommentBookReview(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    addReview();
    setOpen(false);
  };

  useEffect(() => {
    fetchReview();
  },[bookReview]);

  return (
    <>
      <Button className="cursor-pointer" onClick={handleClickOpen}>
        Write a review
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <TextareaAutosize
          className="m-2 p-4"
          minRows={10}
          placeholder="Add your review here"
          onChange={handleTextChange}
        ></TextareaAutosize>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
