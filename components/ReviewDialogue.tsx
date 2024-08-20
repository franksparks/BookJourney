import { Button } from "./ui/button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useState } from 'react';
import { TextareaAutosize } from "@mui/material";

export default function ReviewDialogue() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button className="cursor-pointer" onClick={handleClickOpen}>
        Write a review
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <TextareaAutosize className="m-2 p-4" minRows={10} placeholder="Add your review here"></TextareaAutosize>
        <DialogActions>
          <Button onClick={handleClose}>Save</Button>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}