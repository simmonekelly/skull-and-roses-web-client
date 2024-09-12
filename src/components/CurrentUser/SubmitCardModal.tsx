import React, { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import { User } from "../../types/Types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { SubmitCardButton } from "./SubmitCardButton";
import { SubmittedCardData } from "../../types/Types";
import { CardProps } from "./CurrenUserCard";

type Props = CardProps & {
  open: boolean;
  handleClose: () => void;
};

export const SubmitCardModal: React.FC<Props> = ({
  open,
  handleClose,
  card,
  index,
}) => {
  const {
    socket,
    setCurrentUser: updateUser,
    currentUser,
    room: currentRoom,
  } = useContext(SocketContext);

  const handleSubmit = () => {
    const cardData: SubmittedCardData = { cardText: card, cardIndex: index };
    handleClose();
    socket?.emit(
      "submit_card",
      currentRoom.roomId,
      currentUser.id,
      cardData,
      (currentUser: User) => {
        updateUser(currentUser);
      }
    );
  };

  return (
    <div>
      <Dialog open={open} disableEscapeKeyDown={true} onClick={handleClose}>
        <DialogContent>
          <DialogContentText>
            Do you want to submit the {card} card?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <SubmitCardButton handleSubmit={handleSubmit} />
        </DialogActions>
      </Dialog>
    </div>
  );
};
