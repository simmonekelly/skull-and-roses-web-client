import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Button } from "./UI/Button";

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  disableEscapeKeyDown?: boolean;
  title?: string;
  content: JSX.Element;
  buttonText: string;
};

export const Modal: React.FC<ModalProps> = ({
  open,
  handleClose,
  title,
  content,
  buttonText,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      {title && <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>}
      <DialogContent dividers={true}>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{buttonText}</Button>
      </DialogActions>
    </Dialog>
  );
};
