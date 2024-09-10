import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { useParams } from "react-router-dom";
import type {
  Room as RoomType,
  JoinRoom as JoinRoomType,
} from "../types/Types";
import { StockPile } from "../components/StockPile";
import { CurrentUser } from "../components/CurrentUserView";
import { OpponentsSection } from "../components/OpponentsSection";

export const Room: React.FC = () => {
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

  //event to update when new user joins
  socket?.on("new_user_joins", (room: RoomType) => {
    console.log({ currentRoom, room, action: "new user joins" });
    setRoom(room);
  });

  console.log({ currentRoom, currentUser });
  const isLoading = currentRoom === undefined || currentUser === undefined;

  if (isLoading) {
    return <div>Room Loading</div>;
  } else {
    return (
      <div>
        <h1>Room: {currentRoom.roomId} </h1>
        <p>Players in Room: {currentRoom.players.length}</p>
        <CurrentUser />
        {currentRoom.stockPile.length > 0 && <StockPile />}
        <p>Opps Cards:</p>
        {currentRoom.players.length > 1 && <OpponentsSection />}
      </div>
    );
  }
};
