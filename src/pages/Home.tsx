import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
      <button onClick={newRoomOnClick}>Create New Room</button>
      <div>
        <input
          placeholder="Input Room Number To Join"
          onChange={(event) => {
            setRoomToJoin(event.target.value);
          }}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
    </div>
  );
};
