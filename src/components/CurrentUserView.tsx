import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { Card } from "./Card";
import { styled } from "styled-components";
import { MakeGuessInput } from "./MakeGuessInput";

export const CurrentUser: React.FC = () => {
  const { currentUser } = useContext(SocketContext);

  return (
    <StyledUserSection>
      <p>Current User: {currentUser.id}</p>
      <MakeGuessInput />
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
`;

const StyledUserSection = styled.div`
  display: flex;
  flex-direction: column;
`;
