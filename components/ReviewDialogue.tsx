import { Button } from "./ui/button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { TextareaAutosize } from "@mui/material";
import { Review } from "@/models/review";
import { Book } from "@/models/book";
import { actionGetReviewByGoogleBookIdAndUserId, actionInsertReview } from "@/actions/reviews";

type ReviewDialogueProps = {
  bookInDb: Book | null;
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
    if (dbUser && bookInDb) {
      const review: Review = await actionGetReviewByGoogleBookIdAndUserId(
        bookInDb!.googleBooksId,
        dbUser.id
      );
      if (review) {
        setBookReview(review);
        setCommentBookReview(review.comment);

        console.log(review);
        console.log("REVIEW COMMENT", review.comment);
      }
    }
  }, [dbUser, bookInDb, bookReview]);

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
    setCommentBookReview(review.comment);

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
    setOpen(false);
  };

  const handleMouseDown = () => {
    addReview();
  }

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
          value={commentBookReview}
          onChange={handleTextChange}
        ></TextareaAutosize>
        <DialogActions>
          <Button onClick={handleSave} onMouseDown={handleMouseDown}>Save</Button>
          <Button onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
