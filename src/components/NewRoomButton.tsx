import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import type { Room } from "../types/Types";

type CreateRoomButtonProps = {};

export const CreateRoomButton: React.FC<CreateRoomButtonProps> = () => {
  const { socket, setRoom } = useContext(SocketContext);
  const navigate = useNavigate();

  const createNewRoom = () => {
    console.log("create new room");
    socket?.emit("create_room", (room: Room) => {
      console.log({ room });
      navigate(`/room/${room.roomId}`);
      setRoom(room);
    });
  };
  return (
    <div>
      <button onClick={createNewRoom}>Create Room</button>
    </div>
  );
};
