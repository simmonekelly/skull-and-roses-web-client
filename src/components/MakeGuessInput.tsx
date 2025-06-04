import React, { useState } from "react";
import { Input } from "./UI/Input";
import { Button } from "./UI/Button";
import styled from "styled-components";
import { CardType, CurrentRoom } from "../types/firebaseTypes";
import { update } from "firebase/database";

export const MakeGuessInput: React.FC<CurrentRoom> = ({
  roomData,
  currentUser,
  currentRoomRef,
}) => {
  const stockPileLength = roomData.stockPile
    ? Object.keys(roomData.stockPile).length
    : 0;
  const [userGuess, setUserGuess] = useState<string>();

  const skullIndex =
    Object.values(roomData.stockPile || {}).findIndex(
      (card) => card.type === CardType.Skull
    ) + 1;

  const submitGuess = async () => {
    if (userGuess && +userGuess > stockPileLength) {
      console.log(
        "Your guess is higher than the number of cards in the stock pile. Please guess again"
      );
    } else if (userGuess) {
      try {
        const guessAsNumber = +userGuess;

        let guessStatus: boolean;
        if (guessAsNumber === skullIndex) {
          guessStatus = true;
        } else {
          guessStatus = false;
        }
        await update(currentRoomRef, {
          players: {
            ...roomData.players,
            [currentUser.id]: {
              ...currentUser,
              guessedCorrectly: guessStatus,
            },
          },
        });
        //what happens when you guess correctly
        //what happens when you guess incorrectly
        //udate database to show correct or incorrect guess
      } catch (error) {
        console.error("Error submitting guess: ", error);
      }
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
