import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import type { User } from "../types/Types";
import Button from "@mui/material/Button";

type Props = {
  handleClose: () => void;
  resetCurrentGuess: React.Dispatch<React.SetStateAction<number>>;
  resetGuessingUserId: React.Dispatch<React.SetStateAction<string>>;
};

export const NextRoundButton: React.FC<Props> = ({
  handleClose,
  resetCurrentGuess,
  resetGuessingUserId,
}) => {
  const {
    socket,
    room: currentRoom,
    currentUser,
    setCurrentUser,
  } = useContext(SocketContext);

  const resetForNextRound = () => {
    console.log("resetForNextRound");
    handleClose();
    resetCurrentGuess(0);
    resetGuessingUserId("");
    socket?.emit(
      "reset_for_next_round",
      currentRoom.roomId,
      currentUser.id,
      (updatedCurrentUser: User) => {
        console.log("reset emiited");
        setCurrentUser(updatedCurrentUser);
      }
    );
  };
  return (
    <div>
      <Button onClick={resetForNextRound}>Reset For Next Round</Button>
    </div>
  );
};
