import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StockPile } from "../components/StockPile";
import { RoomHeader } from "../components/RoomHeader/RoomHeader";
import { styled } from "styled-components";
import { Divider } from "@mui/material";
import { DatabaseContext } from "../context/DatabaseContext";
import { ref, onValue } from "firebase/database";
import type { Room as RoomType } from "../types/firebaseTypes";
import { H3 } from "../styles/styles";
import { CreateUserModal } from "../components/CreateUserModal";
import { OpponentsSection } from "../components/OpponentsSection";
import { CurrentUser } from "../components/CurrentUser/CurrentUserView";

export const Room: React.FC = () => {
  const { database } = useContext(DatabaseContext);
  const [roomData, setRoomData] = useState<RoomType>();
  let storageData = sessionStorage.getItem("currentUserNameId");

  const params = useParams();

  console.log({ params, database, roomData, storageData });

  const currentRoomRef = ref(database, `/rooms/${params.id}`);

  useEffect(() => {
    const unsubscribe = onValue(currentRoomRef, (snapshot) => {
      const value = snapshot.val();
      console.log("Current data:", value);
      setRoomData(value);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array means this runs once on mount

  //TODO:
  //create new game
  //see why cards are not resetting

  const isLoading = roomData === null || roomData === undefined;
  console.log({ isLoading });

  if (isLoading) {
    return <div>Room Loading</div>;
  } else {
    const isCurrentUserInRoom = Boolean(
      roomData.players.find((player) => player.id === storageData)
    );

    console.log({ isCurrentUserInRoom });

    return (
      <Container>
        <CreateUserModal
          isOpen={!isCurrentUserInRoom}
          currentRoomRef={currentRoomRef}
          roomData={roomData}
        />
        <H3>Room: {roomData.name}</H3>
        <RoomHeader currentRoomRef={currentRoomRef} roomData={roomData} />
        {/* <GuessResultModal /> */}
        <CurrentUser currentRoom={roomData} />
        <Divider variant="middle" />
        <StockPile {...roomData} />
        <Divider variant="middle" />
        <OpponentsSection currentRoom={roomData} />
      </Container>
    );
  }
};

const Container = styled.div`
  padding: 30px;
`;
