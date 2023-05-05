import React, { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import type { Room } from "../types/Types";

export const JoinRoom: React.FC = () => {
  const { socket, setRoom } = useContext(SocketContext);
  const navigate = useNavigate();
  const [roomToJoin, setRoomToJoin] = useState<string>();

  const joinRoom = () => {
    console.log("join room input");
    socket?.emit("join_room", roomToJoin, (room: Room) => {
      navigate(`/room/${room.roomId}`);
      setRoom(room);
    });
  };

  return (
    <div>
      <input
        placeholder="Input Room Name"
        onChange={(e) => setRoomToJoin(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
};
