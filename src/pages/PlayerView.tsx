import React from "react";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { io } from "socket.io-client";
const socket = io("http://localhost:8080");

type Props = {
  room?: string;
};

export const PlayerView: React.FC<Props> = ({ room }) => {
  //users
  //   const [players, setPlayers] = useState(Array);
  //current players cards
  const [topCard, setTopCard] = useState(Boolean);
  const [pickedCards, setPickedCards] = useState(Array);

  //opponents cards
  const [oppTopCard, setOppTopCard] = useState("");
  const [oppPickedCards, setOppPickedCards] = useState([]);

  //setting the selected card
  const setCard = (id: number, isRose: boolean) => {
    console.log("set card");
    setTopCard(isRose);
    setPickedCards([...pickedCards, id]);
  };

  //sending selected card to backend
  const submitCard = () => {
    console.log("card picked");
    socket.emit("card_picked", { topCard, pickedCards, room });
  };

  //recieving data from back end of opponents card selection
  useEffect(() => {
    socket.on("display_picked_card", (data: any) => {
      console.log(data);
      setOppTopCard(data.topCard);
      setOppPickedCards(data.pickedCards);
    });
  });

  return (
    <div>
      <h1>Player View</h1>
      {/* how to see multiple opps? */}
      <div>
        Opponents Cards
        <div>Top Card: {oppTopCard ? "skull" : "rose"}</div>
        <div>Picked Cards: {oppPickedCards.length}</div>
        <div>Cards Left: {4 - oppPickedCards.length}</div>
      </div>
      <hr />
      <Card onClick={setCard} id={1} isRose={true} />
      <Card onClick={setCard} id={2} isRose={true} />
      <Card onClick={setCard} id={3} isRose={true} />
      <Card onClick={setCard} id={4} isRose={true} />
      <button onClick={submitCard}>Submit</button>
    </div>
  );
};
