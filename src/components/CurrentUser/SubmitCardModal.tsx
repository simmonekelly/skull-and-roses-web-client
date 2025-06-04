import React, { useContext } from "react";
import { CardProps } from "./CurrenUserCard";
import { DatabaseContext } from "../../context/DatabaseContext";
import { Modal } from "../Modal";

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
    <Modal
      open={open}
      handleClose={handleClose}
      content={`Do you want to submit the ${card.type} card?`}
      buttonText="Submit Card"
      onSubmit={handleSubmit}
    />
  );
};
