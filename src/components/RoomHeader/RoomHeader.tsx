import React from "react";
import { PlayersMenu } from "./PlayersMenu";
import { styled } from "styled-components";
import { RulesButton } from "./RulesButton";
import { CurrentUserButton } from "./CurrentUserButton";
import { CurrentRoom } from "../../types/firebaseTypes";

export const RoomHeader: React.FC<CurrentRoom> = ({
  currentRoomRef,
  roomData,
  currentUser,
}) => {
  return (
    <Container>
      <PlayersMenu players={roomData.players} />
      <RightSideContainer>
        <RulesButton />
        {currentUser && (
          <CurrentUserButton
            currentUser={currentUser}
            currentRoomRef={currentRoomRef}
            roomData={roomData}
          />
        )}
      </RightSideContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const RightSideContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 35%;
`;
