import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { Room, User } from "../types/Types";
import { NextRoundButton } from "./NextRoundButton";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

type Props = {};

export const GuessResultModal: React.FC<Props> = () => {
  const {
    socket,
    currentUser,
    room: currentRoom,
    setCurrentUser,
  } = useContext(SocketContext);
  const [currentGuess, setCurrentGuess] = useState<number>(0);
  const [guessingUserId, setGuessingUserId] = useState<string>("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [message, setMessage] = useState<string>("");

  socket?.on(
    "show_guess_result_modal",
    (room: Room, userId: string, userGuess: number) => {
      setCurrentGuess(userGuess);
      setGuessingUserId(userId);
      handleOpen();
    }
  );

  let currentGuessResult = useRef({});

  useEffect(() => {
    const hasGuessData = Boolean(currentGuess !== 0 && guessingUserId);

    if (hasGuessData) {
      if (currentGuess === 0) {
        setMessage("waiting");
        currentGuessResult.current = "waiting";
      }

      const skullIndex = currentRoom.stockPile.findIndex(
        (card) => card === "skull"
      );

      const result = skullIndex > currentGuess - 1 || skullIndex === -1;
      setMessage(
        `${guessingUserId} ${
          result
            ? "won this round!"
            : "looses this round and will loose a card :("
        }`
      );
      currentGuessResult.current = result;
    }
  }, [currentGuess]);

  useEffect(() => {
    if (typeof currentGuessResult.current === "boolean" && open === true) {
      socket?.emit(
        "update_mat_status",
        currentRoom.roomId,
        guessingUserId,
        currentUser.id,
        currentGuessResult.current,
        (updatedCurrentUser: User) => {
          console.log("guess result emitted");
        }
      );
    }
  }, [currentGuessResult.current]);

  return (
    <div>
      <Dialog open={open} disableEscapeKeyDown={true}>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <NextRoundButton
            handleClose={handleClose}
            resetCurrentGuess={setCurrentGuess}
            resetGuessingUserId={setGuessingUserId}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};
