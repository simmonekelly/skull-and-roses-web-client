import React from "react";
import { useEffect, useState } from "react";
import { RoseCard } from "../components/RoseCard";

type Props = {
  room?: number;
};

export const PlayerView: React.FC<Props> = ({ room }) => {
  const [topCard, setTopCard] = useState(Boolean);
  const [pickedCards, setPickedCards] = useState(Array);

  const setCard = (id: number, isRose: boolean) => {
    setTopCard(isRose);
    setPickedCards([...pickedCards, id]);
  };

  return (
    <div>
      <h1>Player View</h1>
      <RoseCard />
    </div>
  );
};
