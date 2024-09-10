import React, { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export const MakeGuessInput: React.FC = () => {
  const { socket, currentUser, room: currentRoom } = useContext(SocketContext);
  const [userGuess, setUserGuess] = useState<string>();

  const submitGuess = () => {
    if (userGuess && +userGuess > currentRoom.stockPile.length) {
      console.log(
        "Your guess is higher than the number of cards in the stock pile. Please guess again"
      );
    } else if (userGuess) {
      const guessAsNumber = +userGuess;
      socket?.emit(
        "submit_guess",
        currentRoom.roomId,
        currentUser.id,
        guessAsNumber,
        () => {
          console.log("guess emitted");
        }
      );
    } else {
      console.log("please input a guess");
    }
  };

  return (
    <div>
      <input
        placeholder="Input Guess"
        onChange={(e) => setUserGuess(e.target.value)}
      />
      <button onClick={() => submitGuess()}>Make Guess</button>
    </div>
  );
};
