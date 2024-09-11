import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

export const StockPile: React.FC = () => {
  const { room: currentRoom } = useContext(SocketContext);

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
