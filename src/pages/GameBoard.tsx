import { DatabaseReference } from "firebase/database";
import React from "react";
import { Room, User } from "../types/firebaseTypes";
import { RoomHeader } from "../components/RoomHeader/RoomHeader";
import { H3 } from "../styles/styles";
import { CurrentUser } from "../components/CurrentUser/CurrentUserView";
import { Divider } from "@mui/material";
import { StockPile } from "../components/StockPile";
import { OpponentsSection } from "../components/OpponentsSection";
import { GuessResultModal } from "../components/GuessResultModal";
import { OtherUsersTurnModal } from "../components/CurrentUser/OtherUsersTurnModal";

type Props = {
  currentUser: User;
  currentRoomRef: DatabaseReference;
  roomData: Room;
};

export const GameBoard: React.FC<Props> = ({
  currentUser,
  currentRoomRef,
  roomData,
}) => {
  const isThereAGuess = Object.values(roomData.players).some(
    (player) => "guessedCorrectly" in player
  );

  return (
    <>
      <H3>Room: {roomData.name}</H3>
      <RoomHeader
        currentRoomRef={currentRoomRef}
        roomData={roomData}
        currentUser={currentUser}
      />
      <GuessResultModal
        roomData={roomData}
        currentRoomRef={currentRoomRef}
        currentUser={currentUser}
        isThereAGuess={isThereAGuess}
      />
      <OtherUsersTurnModal open={!currentUser.activeTurn && !isThereAGuess} />
      <CurrentUser
        roomData={roomData}
        currentRoomRef={currentRoomRef}
        currentUser={currentUser}
      />
      <Divider variant="middle" />
      <StockPile {...roomData} />
      <Divider variant="middle" />
      <OpponentsSection
        roomData={roomData}
        currentRoomRef={currentRoomRef}
        currentUser={currentUser}
      />
    </>
  );
};
