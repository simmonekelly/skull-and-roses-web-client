import React, { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { SubmittedCardData, User } from "../types/Types";

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
    <div>
      <h1 onClick={() => setSelectedCard(!selectedCard ? true : false)}>
        {card}
      </h1>
      {selectedCard && (
        <button onClick={() => submitCard(card, index)}>submit</button>
      )}
    </div>
  );
};
