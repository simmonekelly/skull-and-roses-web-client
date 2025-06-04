import React, { useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { SubmitCardButton } from "./SubmitCardButton";
import { CardProps } from "./CurrenUserCard";
import { DatabaseContext } from "../../context/DatabaseContext";

type Props = CardProps & {
  open: boolean;
  handleClose: () => void;
};

export const SubmitCardModal: React.FC<Props> = ({
  open,
  handleClose,
  card,
  currentUser,
  currentRoomRef,
  roomData,
}) => {
  const { submitCard } = useContext(DatabaseContext);

  const handleSubmit = () => {
    handleClose();
    submitCard(currentUser, currentRoomRef, roomData, card);
  };

  return (
    <div>
      <Dialog open={open} disableEscapeKeyDown={true} onClick={handleClose}>
        <DialogContent>
          <DialogContentText>
            Do you want to submit the {card.type} card?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <SubmitCardButton handleSubmit={handleSubmit} />
        </DialogActions>
      </Dialog>
    </div>
  );
};
