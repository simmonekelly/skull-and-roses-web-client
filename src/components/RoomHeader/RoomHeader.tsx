import React from "react";
import { PlayersMenu } from "./PlayersMenu";
import { styled } from "styled-components";
import { RulesButton } from "./RulesButton";
import { CurrentUserButton } from "./CurrentUserButton";
import { CurrentRoom } from "../../types/firebaseTypes";
import { MOBILE } from "../../styles/styles";
import { useMedia } from "react-use";

export const RoomHeader: React.FC<CurrentRoom> = ({
  currentRoomRef,
  roomData,
  currentUser,
}) => {
  const isMobile = useMedia(`(max-width: ${MOBILE.max}px)`);

  console.log({ isMobile });
  return isMobile ? (
    <MobileContainer>
      <RulesButton />
      <PlayersMenu players={roomData.players} />
      {currentUser && (
        <CurrentUserButton
          currentUser={currentUser}
          currentRoomRef={currentRoomRef}
          roomData={roomData}
        />
      )}
    </MobileContainer>
  ) : (
    <DesktopContainer>
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
    </DesktopContainer>
  );
};

const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
`;

const DesktopContainer = styled.div`
  display: flex;
  padding: 30px;
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
