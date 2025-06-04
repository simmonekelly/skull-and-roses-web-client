import React from "react";
import { CurrenUserCard } from "./CurrenUserCard";
import { styled } from "styled-components";
import { MakeGuessInput } from "../MakeGuessInput";
import { UserMat } from "../UserMat";
import Divider from "@mui/material/Divider";
import { H2 } from "../../styles/styles";
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
      <TopSection>
        <LeftSide>
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
        </LeftSide>
        <Divider variant="middle" orientation="vertical" flexItem />
        <RightSide>
          <UserMat status={currentUser.matStatus} />
        </RightSide>
      </TopSection>
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

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 20px;
`;

const LeftSide = styled.div`
  margin-right: 10px;
`;

const RightSide = styled.div`
  width: 155px;
  height: 155px;
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 4px;
  margin-left: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
