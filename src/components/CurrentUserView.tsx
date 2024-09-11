import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { Card } from "./Card";
import { styled } from "styled-components";
import { MakeGuessInput } from "./MakeGuessInput";
import { UserMat } from "./UserMat";

export const CurrentUser: React.FC = () => {
  const { currentUser } = useContext(SocketContext);

  return (
    <StyledUserSection>
      <TopSection>
        <LeftSide>
          <p>Current User: {currentUser.id}</p>
          <MakeGuessInput />
        </LeftSide>
        <RightSide>
          <UserMat shouldShow={currentUser.matStatus} />
        </RightSide>
      </TopSection>
      <h2>Your Cards:</h2>
      <CardContainer>
        {currentUser.cards.map((card, i) => (
          <Card card={card} index={i} key={i} />
        ))}
      </CardContainer>
    </StyledUserSection>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const StyledUserSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;

const RightSide = styled.div``;
