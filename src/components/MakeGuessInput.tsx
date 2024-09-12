import React, { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { Input } from "./UI/Input";
import { Button } from "./UI/Button";
import styled from "styled-components";

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
    <Container>
      <Input placeholderText="Input Guess" handleOnChange={setUserGuess} />
      <Button onClick={submitGuess}>Make Guess</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;
