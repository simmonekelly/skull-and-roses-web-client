import "./App.css";
import { io } from "socket.io-client";
import SkullHero from "./images/SkullHero.jpg";
import { PlayerView } from "./pages/PlayerView";
const socket = io("http://localhost:8080");

function App() {
  //creating a new room
  const createNewRoom = () => {
    console.log("create new room");
    socket.emit("create_room", { room: "new room name" });
  };

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
      <PlayerView />
    </div>
  );
}

export default App;
