import React, { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { Input } from "./UI/Input";
import { Button } from "./UI/Button";
import styled from "styled-components";
import { CurrentRoom } from "../types/firebaseTypes";

export const MakeGuessInput: React.FC<CurrentRoom> = ({ roomData }) => {
  const stockPileLength = roomData.stockPile
    ? Object.keys(roomData.stockPile).length
    : 0;
  const [userGuess, setUserGuess] = useState<string>();

  const submitGuess = () => {
    if (userGuess && +userGuess > stockPileLength) {
      console.log(
        "Your guess is higher than the number of cards in the stock pile. Please guess again"
      );
    } else if (userGuess) {
      const guessAsNumber = +userGuess;
      console.log("guess:", guessAsNumber);
      //what happens when you guess correctly
      //what happens when you guess incorrectly
      //udate database to show correct or incorrect guess
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
