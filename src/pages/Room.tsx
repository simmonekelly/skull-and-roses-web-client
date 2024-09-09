import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { useParams } from "react-router-dom";
import type {
  Room as RoomType,
  JoinRoom as JoinRoomType,
} from "../types/Types";
import { Card } from "../components/Card";
import { OpponentCard } from "../components/OpponentCard";

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
        <p>Current User: {currentUser.id}</p>
        <p>Your Cards:</p>
        {currentUser.cards.map((card) => {
          return <Card card={card} />;
        })}
        <br />
        <p>Opps Cards:</p>
        {currentRoom.players.length > 1 &&
          currentRoom.players
            .filter((player) => player.id !== currentUser.id)
            .map((filteredPlayer) => (
              <>
                <h3>{filteredPlayer.id}</h3>
                {filteredPlayer.cards.map((card) => (
                  <OpponentCard />
                ))}
              </>
            ))}
      </div>
    );
  }
};
