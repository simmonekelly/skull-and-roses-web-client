import React from "react";
import { useEffect, useState } from "react";
import { RoseCard } from "../components/RoseCard";
import { io } from "socket.io-client";
const socket = io("http://localhost:8080");

type Props = {
  room?: number;
};

export const PlayerView: React.FC<Props> = ({ room }) => {
  //current players cards
  const [topCard, setTopCard] = useState(Boolean);
  const [pickedCards, setPickedCards] = useState(Array);

  //opponents cards
  const [oppTopCard, setOppTopCard] = useState("");
  const [oppPickedCards, setOppPickedCards] = useState([]);

  //sending selected card to backend
  const submitCard = () => {
    console.log("card picked");
    socket.emit("card_picked", { topCard, pickedCards });
  };

  //setting the selected card
  const setCard = (id: number, isRose: boolean) => {
    setTopCard(isRose);
    setPickedCards([...pickedCards, id]);
  };

  //recieving data from back end of opponents card selection
  useEffect(() => {
    socket.on("display_picked_card", (data: any) => {
      console.log({ data });
      setOppTopCard(data.topCard);
      setOppPickedCards(data.pickedCards);
    });
  }); //, [socket]);

  console.log({ topCard, pickedCards, oppTopCard, oppPickedCards });

  return (
    <div>
      <h1>Player View</h1>
      <div>
        Opponents Cards
        <div>Top Card: {oppTopCard ? "skull" : "rose"}</div>
        <div>Picked Cards: {oppPickedCards.length}</div>
        <div>Cards Left: {4 - oppPickedCards.length}</div>
      </div>
      <hr />
      <RoseCard />
      <div>
        <div onClick={() => setCard(1, false)}>rose</div>
        <div onClick={() => setCard(2, false)}>rose</div>
        <div onClick={() => setCard(3, true)}>skull</div>
        <div onClick={() => setCard(4, false)}>rose</div>
      </div>
      <button onClick={submitCard}>Submit</button>
    </div>
  );
};
