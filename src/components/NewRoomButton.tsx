import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import type { NewRoom } from "../types/Types";

type CreateRoomButtonProps = {};

export const CreateRoomButton: React.FC<CreateRoomButtonProps> = () => {
  const { socket, setRoom, setCurrentUser } = useContext(SocketContext);
  const navigate = useNavigate();

  const createNewRoom = () => {
    console.log("create new room");
    socket?.emit("create_room", (newRoom: NewRoom) => {
      navigate(`/room/${newRoom.room.roomId}`);
      setRoom(newRoom.room);
      setCurrentUser(newRoom.currentUser);
    });
  };
  return (
    <div>
      <button onClick={createNewRoom}>Create Room</button>
    </div>
  );
};
