import React, { useContext, useMemo, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { Room } from "../types/Types";

export const StockPile: React.FC = () => {
  const { room: currentRoom, socket } = useContext(SocketContext);
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
    const result = skullIndex > currentGuess - 1 ? "wins!" : "looses :(";

    return result;
  }, [currentGuess, currentRoom.stockPile]);

  return (
    <div>
      <h2>StockPile:</h2>
      {hasGuessData && (
        <>
          <p>
            Current Guess: {user} guessed {currentGuess}
          </p>
          <h4>
            result : {user} {guessResult}
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
