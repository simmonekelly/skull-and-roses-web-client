import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import SkullHero from "./images/SkullHero.jpg";
const socket = io.connect("http://localhost:8080");

function App() {
  const [topCard, setTopCard] = useState("");
  const [pickedCards, setPickedCards] = useState([]);

  //opponents cards
  const [oppTopCard, setOppTopCard] = useState("");
  const [oppPickedCards, setOppPickedCards] = useState([]);

  //creating a new room
  const createNewRoom = () => {
    console.log("create new room");
    socket.emit("create_room", { room: "new room name" });
  };

  //sending message to backend
  const confirmDeck = () => {
    console.log("card picked");
    socket.emit("card_picked", { topCard, pickedCards });
  };

  const setCard = (id, isRose) => {
    setTopCard(isRose);
    setPickedCards([...pickedCards, id]);
  };

  useEffect(() => {
    socket.on("display_picked_card", (data) => {
      setOppTopCard(data.topCard);
      setOppPickedCards(data.pickedCards);
    });
  }); //, [socket]);

  console.log({ topCard, pickedCards, oppTopCard, oppPickedCards });

  return (
    <div className="App">
      <h1>Skull & Roses</h1>
      <img style={{ width: 200 }} alt="home-page-hero" src={SkullHero} />
      <div>
        <button onClick={createNewRoom}>Create New Room</button>
      </div>
      <div>
        <input placeholder="Input Room Number To Join" />
        <button>Join Room</button>
      </div>

      <div>Game Room With Up to 6 People</div>
      <div>
        <div onClick={() => setCard(1, false)}>rose</div>
        <div onClick={() => setCard(2, false)}>rose</div>
        <div onClick={() => setCard(3, true)}>skull</div>
        <div onClick={() => setCard(4, false)}>rose</div>
      </div>
      <button onClick={confirmDeck}>Submit</button>
      <div>
        Opponents Cards
        <div>Top Card: {oppTopCard ? "skull" : "rose"}</div>
        <div>Picked Cards: {oppPickedCards}</div>
        <div>Cards Left: {4 - oppPickedCards.length}</div>
      </div>
    </div>
  );
}

export default App;
