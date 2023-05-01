import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SkullHero from "../images/SkullHero.jpg";

type Props = {
  newRoomOnClick?: any;
  roomId?: string;
  socket?: any;
};

export const Home: React.FC<Props> = ({ newRoomOnClick, roomId, socket }) => {
  const [roomToJoin, setRoomToJoin] = useState("");
  const navigate = useNavigate();

  // join a room
  const joinRoom = () => {
    if (roomId != null) {
      console.log(`joining ${roomToJoin}`);
      socket.emit("join_room", { roomToJoin });
    }
  };

  if (roomId) {
    navigate(`room/${roomId}`);
  }
  return (
    <div>
      <div>
        <img style={{ width: 200 }} alt="home-page-hero" src={SkullHero} />
      </div>
      <button onClick={newRoomOnClick}>Create New Room</button>
      <div>
        <input
          placeholder="Input Room Name To Join"
          onChange={(event) => {
            setRoomToJoin(event.target.value);
          }}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
    </div>
  );
};
