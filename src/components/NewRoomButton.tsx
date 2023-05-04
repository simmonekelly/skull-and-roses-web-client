import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";

type CreateRoomButtonProps = {};

export const CreateRoomButton: React.FC<CreateRoomButtonProps> = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const createNewRoom = () => {
    console.log("create new room");
    socket?.socket?.emit("create_room", (roomId: string) => {
      console.log({ roomId });
      navigate(`/room/${roomId}`);
    });
  };
  return (
    <div>
      <button onClick={createNewRoom}>Create Room</button>
    </div>
  );
};
