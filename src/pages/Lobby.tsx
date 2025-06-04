import React, { useContext } from "react";
import { styled } from "styled-components";
import type { Room } from "../types/firebaseTypes";
import { H2, H3, Paragraph } from "../styles/styles";
import { CreateUserModal } from "../components/CreateUserModal";
import { DatabaseReference } from "firebase/database";
import { Button } from "../components/UI/Button";
import { DatabaseContext } from "../context/DatabaseContext";

type Props = {
  isCurrentUserInRoom: boolean;
  currentRoomRef: DatabaseReference;
  roomData: Room;
};

export const Lobby: React.FC<Props> = ({
  roomData,
  isCurrentUserInRoom,
  currentRoomRef,
}) => {
  const { updateGameStatus } = useContext(DatabaseContext);
  const currentUserId = sessionStorage.getItem("currentUserNameId");

  const isMainUser = Boolean(
    currentUserId && roomData.players[currentUserId].gameControler
  );
  const canUserStartGame = Object.keys(roomData.players).length >= 2;

  return (
    <Container>
      <CreateUserModal
        isOpen={!isCurrentUserInRoom}
        currentRoomRef={currentRoomRef}
        roomData={roomData}
      />
      <H3>Lobby For Room:</H3>
      <H2>{roomData.name}</H2>
      <Paragraph>Current Players:</Paragraph>
      <ul>
        {Object.entries(roomData.players).map(([key, value]) => (
          <li key={key}>{value.username}</li>
        ))}
      </ul>
      {isMainUser && canUserStartGame && (
        <Button
          onClick={() => {
            updateGameStatus(true, currentRoomRef);
          }}
          buttonType="solid"
        >
          Start Game
        </Button>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 30px;
`;
