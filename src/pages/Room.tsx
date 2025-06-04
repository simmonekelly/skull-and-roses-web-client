import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { DatabaseContext } from "../context/DatabaseContext";
import { ref, onValue } from "firebase/database";
import type { Room as RoomType } from "../types/firebaseTypes";
import { Loading } from "./Loading";
import { Lobby } from "./Lobby";
import { GameBoard } from "./GameBoard";

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
  }, []); // Empty dependency array means this runs once on mount

  const isLoading = roomData === null || roomData === undefined;
  const currentUserId = sessionStorage.getItem("currentUserNameId");
  const isCurrentUserInRoom = Boolean(
    currentUserId !== null && roomData?.players[currentUserId]
  );

  if (isLoading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  } else if (!roomData.hasGameStarted) {
    return (
      <Container>
        <Lobby
          isCurrentUserInRoom={isCurrentUserInRoom}
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
  padding: 30px;
`;
