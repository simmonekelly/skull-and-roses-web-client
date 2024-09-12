import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { useParams } from "react-router-dom";
import type {
  Room as RoomType,
  JoinRoom as JoinRoomType,
} from "../types/Types";
import { StockPile } from "../components/StockPile";
import { CurrentUser } from "../components/CurrentUser/CurrentUserView";
import { OpponentsSection } from "../components/OpponentsSection";
import { GuessResultModal } from "../components/GuessResultModal";
import { RoomHeader } from "../components/RoomHeader/RoomHeader";
import { styled } from "styled-components";
import { Divider } from "@mui/material";

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
        setRoom(joinRoom.room);
        setCurrentUser(joinRoom.currentUser);
      });
    }
  }, [currentRoom, params.id, socket, setRoom, setCurrentUser]);

  //event to update when new user joins
  socket?.on("new_user_joins", (room: RoomType) => {
    setRoom(room);
  });

  //event to update when any other update happens
  //change event to update stockpile
  socket?.on("update_room", (room: RoomType) => {
    setRoom(room);
  });

  //TODO:
  //create new game
  //see why cards are not resetting
  //when a user leaves
  //how to handle when a user wins the game

  const isLoading = currentRoom === undefined || currentUser === undefined;

  if (isLoading) {
    return <div>Room Loading</div>;
  } else {
    return (
      <Container>
        <RoomHeader />
        <GuessResultModal />
        <CurrentUser />
        <Divider variant="middle" />
        <StockPile />
        <Divider variant="middle" />
        <OpponentsSection />
      </Container>
    );
  }
};

const Container = styled.div`
  padding: 30px;
`;
