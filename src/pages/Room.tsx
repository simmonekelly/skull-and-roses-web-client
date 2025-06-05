import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { DatabaseContext } from "../context/DatabaseContext";
import { ref, onValue } from "firebase/database";
import type { Room as RoomType } from "../types/firebaseTypes";
import { Lobby } from "./Lobby";
import { GameBoard } from "./GameBoard";
import { RoomDoesNotExist } from "./RoomDoesNotExist";
import { TABLET } from "../styles/styles";

export const Room: React.FC = () => {
  const { database } = useContext(DatabaseContext);
  const [roomData, setRoomData] = useState<RoomType>();
  const params = useParams();
  const currentRoomRef = ref(database, `/rooms/${params.id}`);

  useEffect(() => {
    const unsubscribe = onValue(currentRoomRef, (snapshot) => {
      const value = snapshot.val();
      console.log("Current data:", value);
      setRoomData(value);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []); // Empty dependency array means this runs once on mount

  const isLoading = roomData === null || roomData === undefined;
  const currentUserId = sessionStorage.getItem("currentUserNameId");

  if (isLoading) {
    return (
      <Container>
        <RoomDoesNotExist />
      </Container>
    );
  } else if (!roomData.hasGameStarted) {
    const isCurrentUserInRoom = (): boolean => {
      const hasId = currentUserId !== null;

      if (!hasId) return false;
      return Boolean(roomData.players && currentUserId in roomData.players);
    };
    return (
      <Container>
        <Lobby
          isCurrentUserInRoom={isCurrentUserInRoom()}
          currentRoomRef={currentRoomRef}
          roomData={roomData}
        />
      </Container>
    );
  } else {
    return (
      <Container>
        <GameBoard
          currentUser={roomData.players[currentUserId!]}
          currentRoomRef={currentRoomRef}
          roomData={roomData}
        />
      </Container>
    );
  }
};

const Container = styled.div`
  padding: 10px;

  @media (min-width: ${TABLET.min}px) and (max-width: ${TABLET.max}px) {
    padding: 30px;
  }
`;
