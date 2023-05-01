import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { io } from "socket.io-client";
import { PlayerView } from "./pages/PlayerView";
import { Home } from "./pages/Home";

const socket = io("http://localhost:8080");

function App() {
  const [roomId, setRoomId] = useState("");

  // //creating a new room
  const createNewRoom = () => {
    console.log("create new room");
    socket.emit("create_room");
  };

  useEffect(() => {
    socket.on("room-created", (data: any) => {
      console.log(data);
      setRoomId(data.roomId);
    });
    socket.on("joined_room", (data: any) => {
      console.log(data);
      setRoomId(data.roomToJoin);
    });
  });

  console.log({ roomId });

  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/">
          <h1>Skull & Roses</h1>
        </Link>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                newRoomOnClick={createNewRoom}
                roomId={roomId}
                socket={socket}
              />
            }
          />
          <Route path="/room/:id" element={<PlayerView room={roomId} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
