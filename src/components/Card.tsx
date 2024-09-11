import React, { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { SubmittedCardData, User } from "../types/Types";
import FilterVintageRoundedIcon from "@mui/icons-material/FilterVintageRounded";
import Button from "@mui/material/Button";
import { styled } from "styled-components";

type CardProps = {
  card: string;
  index: number;
};

export const Card: React.FC<CardProps> = ({ card, index }) => {
  const {
    socket,
    setCurrentUser: updateUser,
    room: currentRoom,
    currentUser,
  } = useContext(SocketContext);

  const [selectedCard, setSelectedCard] = useState<boolean>(false);

  const submitCard = (card: string, index: number) => {
    const cardData: SubmittedCardData = { cardText: card, cardIndex: index };
    setSelectedCard(false);
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
    <Container>
      <h1 onClick={() => setSelectedCard(!selectedCard ? true : false)}>
        {card === "rose" ? <FilterVintageRoundedIcon /> : "skull"}
      </h1>
      {selectedCard && (
        <Button variant="outlined" onClick={() => submitCard(card, index)}>
          submit
        </Button>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  border: 1px solid black;
  border-radius: 4px;
  padding: 10px;
  margin: 10px;
  height 130px;
`;
