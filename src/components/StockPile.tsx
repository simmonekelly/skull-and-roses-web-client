import React, { useContext, useEffect, useMemo, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { User, Room } from "../types/Types";

export const StockPile: React.FC = () => {
  const {
    room: currentRoom,
    socket,
    setCurrentUser,
    currentUser,
  } = useContext(SocketContext);
  const [currentGuess, setCurrentGuess] = useState<number>(0);
  const [user, setUser] = useState<string>("");

  socket?.on(
    "update_countdown",
    (room: Room, user: string, userGuess: number) => {
      setCurrentGuess(userGuess);
      setUser(user);
      // console.log({ currentRoom, room, action: "update room" });
      // setRoom(room);
    }
  );

  const hasGuessData = Boolean(currentGuess !== 0 && user);
  const guessResult = useMemo(() => {
    if (currentGuess === 0) {
      return "waiting";
    }

    const skullIndex = currentRoom.stockPile.findIndex(
      (card) => card === "skull"
    );

    const result = skullIndex > currentGuess - 1 || skullIndex === -1;

    return result;
  }, [currentGuess, currentRoom.stockPile]);

  useEffect(() => {
    if (guessResult === true) {
      socket?.emit(
        "update_mat_status",
        currentRoom.roomId,
        user,
        currentUser.id,
        guessResult,
        (updatedUser: User) => {
          console.log("guess result emitted");
          setCurrentUser(updatedUser);
        }
      );
    }
  }, [guessResult]);

  return (
    <div>
      <h2>StockPile:</h2>
      {hasGuessData && (
        <>
          <p>
            Current Guess: {user} guessed {currentGuess}
          </p>
          <h4>
            result : {user} {guessResult ? "win!" : "looses :("}
          </h4>
        </>
      )}
      <p>Number of Cards: {currentRoom.stockPile.length}</p>
      {currentRoom.stockPile.map((card) => (
        <p>{card}</p>
      ))}
    </div>
  );
};
