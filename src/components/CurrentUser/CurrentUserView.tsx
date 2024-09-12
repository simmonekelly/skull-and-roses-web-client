import React, { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import { CurrenUserCard } from "./CurrenUserCard";
import { styled } from "styled-components";
import { MakeGuessInput } from "../MakeGuessInput";
import { UserMat } from "../UserMat";
import Divider from "@mui/material/Divider";
import { H2 } from "../../styles/styles";

export const CurrentUser: React.FC = () => {
  const { currentUser } = useContext(SocketContext);

  return (
    <StyledUserSection>
      <UserInfo>
        <MakeGuessInput />
      </UserInfo>
      <H2>Your Cards:</H2>
      <TopSection>
        <LeftSide>
          <CardContainer>
            {currentUser.cards.map((card, i) => (
              <CurrenUserCard card={card} index={i} key={i} />
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
