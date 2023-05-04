import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";

type CreateRoomButtonProps = {};

export const CreateRoomButton: React.FC<CreateRoomButtonProps> = () => {
  const { socket, setRoomId } = useContext(SocketContext);
  const navigate = useNavigate();

  const createNewRoom = () => {
    console.log("create new room");
    socket?.emit("create_room", (roomId: string) => {
      console.log({ roomId });
      navigate(`/room/${roomId}`);
      setRoomId(roomId);
    });

    //set room id to room id
  };
  return (
    <div>
      <button onClick={createNewRoom}>Create Room</button>
    </div>
  );
};
