import React from "react";
import { PlayersMenu } from "./PlayersMenu";
import { styled } from "styled-components";
import { RulesButton } from "./RulesButton";
import { CurrentUserButton } from "./CurrentUserButton";

export const RoomHeader: React.FC = () => {
  return (
    <Container>
      <PlayersMenu />
      <RightSideContainer>
        <RulesButton />
        <CurrentUserButton />
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
