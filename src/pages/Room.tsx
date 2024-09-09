import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { useParams } from "react-router-dom";
import type {
  Room as RoomType,
  JoinRoom as JoinRoomType,
} from "../types/Types";

type RoomProps = {};

export const Room: React.FC<RoomProps> = () => {
  const {
    room: currentRoom,
    socket,
    setRoom,
    currentUser,
    setCurrentUser,
  } = useContext(SocketContext);
  const params = useParams();

  useEffect(() => {
    if (!currentRoom) {
      console.log("no room id");
      const roomToJoin = params.id;
      socket?.emit("join_room", roomToJoin, (joinRoom: JoinRoomType) => {
        console.log({ joinRoom });
        setRoom(joinRoom.room);
        setCurrentUser(joinRoom.currentUser);
      });
    }
  }, [currentRoom, params.id, socket, setRoom, setCurrentUser]);

  socket?.on("new_user_joins", (room: RoomType) => {
    console.log({ currentRoom, room, action: "new user joins" });
    setRoom(room);
  });
  console.log({ currentRoom, currentUser });

  return !currentRoom ? (
    <div>Room Loading</div>
  ) : (
    <div>
      <h1>Room: {currentRoom.roomId} </h1>
      <p>Players in Room: {currentRoom.players.length}</p>
      <p>Current User: {currentUser}</p>
    </div>
  );
};
