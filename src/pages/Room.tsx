import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { useParams } from "react-router-dom";
import type { Room as RoomType } from "../types/Types";

type RoomProps = {};

export const Room: React.FC<RoomProps> = () => {
  const { room, socket, setRoom } = useContext(SocketContext);
  const params = useParams();

  useEffect(() => {
    if (!room) {
      console.log("no room id");
      const roomToJoin = params.id;
      socket?.emit("join_room", roomToJoin, (room: RoomType) => {
        console.log(room);
        setRoom(room);
      });
    }
  });

  socket?.on("new_user_joins", (room: RoomType) => {
    console.log(room);
    setRoom(room);
  });

  return !room ? (
    <div>Room Loading</div>
  ) : (
    <div>
      <h1>Room: {room.roomId} </h1>
      <p>Players in Room: {room.players.length}</p>
    </div>
  );
};
