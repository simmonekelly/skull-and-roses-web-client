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
  content: JSX.Element | string;
  buttonText?: string;
  onSubmit?: () => void;
};

export const Modal: React.FC<ModalProps> = ({
  open,
  handleClose,
  title,
  content,
  buttonText,
  disableEscapeKeyDown = false,
  onSubmit,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableEscapeKeyDown={disableEscapeKeyDown}
    >
      {title && <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>}
      <DialogContent dividers={true}>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      {buttonText && onSubmit && (
        <DialogActions>
          <Button onClick={onSubmit}>{buttonText}</Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
