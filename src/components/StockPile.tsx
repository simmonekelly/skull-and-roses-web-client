import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { Room as RoomType } from "../types/Types";

export const StockPile: React.FC = () => {
  const { socket, room: currentRoom, setRoom } = useContext(SocketContext);

  //event to update when any other update happens
  socket?.on("update_room", (room: RoomType) => {
    console.log({ currentRoom, room, action: "update room" });
    setRoom(room);
  });

  return (
    <div>
      <h2>StockPile:</h2>
      <p>Number of Cards: {currentRoom.stockPile.length}</p>
      {currentRoom.stockPile.map((card) => (
        <p>{card}</p>
      ))}
    </div>
  );
};
