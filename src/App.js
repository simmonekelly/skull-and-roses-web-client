import "./App.css";
import io from "socket.io-client";
import { useEffect } from "react";

const socket = io.connect("http://localhost:8080");

function App() {
  const confirmDeck = () => {
    console.log("deck confirmed");
    socket.emit("confirm_deck", { message: "confirmed deck" });
  };

  useEffect(() => {
    socket.on("display_deck", (data) => {
      alert(data.message);
    });
  }); //, [socket]);

  return (
    <div className="App">
      <div>Create Game Room Buton</div>
      <div>Game Room With Up to 6 People</div>
      <div>
        <div>rose</div>
        <div>rose</div>
        <div>skull</div>
        <div>rose</div>
      </div>
      <button onClick={confirmDeck}>Submit</button>
    </div>
  );
}

export default App;
