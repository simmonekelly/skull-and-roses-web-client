import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { useParams } from "react-router-dom";
import type { Room as RoomType } from "../types/Types";

type RoomProps = {};

export const Room: React.FC<RoomProps> = () => {
  const { roomId, socket, setRoomId } = useContext(SocketContext);
  const params = useParams();
  if (!roomId) {
    console.log("no room id");
    socket?.emit("join_room", params, (room: RoomType) => {
      console.log(room);
      setRoomId(room.roomId);
    });
  }
  return !roomId ? (
    <div>Room Loading</div>
  ) : (
    <div>
      <h1>Room: {roomId} </h1>
    </div>
  );
};
