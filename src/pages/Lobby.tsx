import React, { useContext } from "react";
import { styled } from "styled-components";
import type { Room } from "../types/firebaseTypes";
import { H2, H3, Paragraph } from "../styles/styles";
import { CreateUserModal } from "../components/CreateUserModal";
import { DatabaseReference } from "firebase/database";
import { Button } from "../components/UI/Button";
import { DatabaseContext } from "../context/DatabaseContext";
import { Header } from "../components/Home/Header";

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
      <Header
        inRoom={true}
        currentRoomRef={currentRoomRef}
        roomData={roomData}
        currentUser={roomData.players[currentUserId!]}
      />
      <CreateUserModal
        isOpen={!isCurrentUserInRoom}
        currentRoomRef={currentRoomRef}
        roomData={roomData}
      />
      <H2>Lobby For Room:</H2>
      <H3>{roomData.name}</H3>
      <Paragraph style={{ marginTop: "20px" }}>
        Current Players In Room:
      </Paragraph>
      <StyledList>
        {Object.entries(roomData.players).map(([key, value]) => (
          <li key={key}>{value.username}</li>
        ))}
      </StyledList>
      {isMainUser &&
        (canUserStartGame ? (
          <Button
            onClick={() => {
              updateGameStatus(true, currentRoomRef);
            }}
            buttonType="solid"
          >
            Start Game
          </Button>
        ) : (
          <Paragraph>Waiting for other players to join...</Paragraph>
        ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 30px;
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
`;
