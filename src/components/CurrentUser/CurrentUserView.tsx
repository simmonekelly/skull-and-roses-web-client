import React from "react";
import { CurrenUserCard } from "./CurrenUserCard";
import { styled } from "styled-components";
import { MakeGuessInput } from "../MakeGuessInput";
import { H2, TABLET } from "../../styles/styles";
import { CurrentRoom } from "../../types/firebaseTypes";

export const CurrentUser: React.FC<CurrentRoom> = ({
  roomData,
  currentRoomRef,
  currentUser,
}) => {
  return (
    <StyledUserSection>
      <UserInfo>
        <MakeGuessInput
          roomData={roomData}
          currentRoomRef={currentRoomRef}
          currentUser={currentUser}
        />
      </UserInfo>
      <H2>Your Cards:</H2>
      <CardContainer>
        {Object.entries(currentUser.cards).map(([index, card]) => (
          <CurrenUserCard
            card={card}
            key={index}
            currentUser={currentUser}
            currentRoomRef={currentRoomRef}
            roomData={roomData}
          />
        ))}
      </CardContainer>
    </StyledUserSection>
  );
};

const StyledUserSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 20px;


  @media (min-width: ${TABLET.min}px) {
    width: 70%;`;
