import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { io } from "socket.io-client";
import { PlayerView } from "./pages/PlayerView";
import { Home } from "./pages/Home";

const socket = io("http://localhost:8080");

function App() {
  const [roomId, setRoomId] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState(Array);

  //leaving room
  const removeRoomId = () => {
    socket.emit("leave_room", { roomId }, (roomId: any) => {
      console.log(`user left room ${roomId}`);
      //find user who left room from array
      //remove them from the room
      setRoomId("");
    });
  };

  const displayUsers = (userId: any) => {
    console.log("displayusers");
    setUsers([...users, userId]);
  };

  console.log({ users, userId });

  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/" onClick={removeRoomId}>
          <h1>Skull & Roses</h1>
        </Link>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                // newRoomOnClick={createNewRoom}
                roomId={roomId}
                socket={socket}
                setRoomId={setRoomId}
                setUserId={setUserId}
                displayUsers={displayUsers}
                users={users}
                userId={userId}
              />
            }
          />
          <Route
            path="/room/:id"
            element={
              <PlayerView
                roomId={roomId}
                user={userId}
                socket={socket}
                users={users}
                displayUsers={displayUsers}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
