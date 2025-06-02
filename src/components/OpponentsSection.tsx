import React from "react";
import { UnnamedCard } from "./UnnamedCard";
import { styled } from "styled-components";
import { UserMat } from "./UserMat";
import { H2, H3 } from "../styles/styles";
import type { Room } from "../types/firebaseTypes";

export const OpponentsSection: React.FC<{ currentRoom: Room }> = ({
  currentRoom,
}) => {
  const filteredPlayers = currentRoom.players.filter(
    (player) => player.id !== sessionStorage.getItem("currentUserNameId")
  );

  return (
    <StyledContainer>
      <H2>Other Players:</H2>
      {currentRoom.players.length > 1 && (
        <PlayersContainer>
          {filteredPlayers.map((player, i) => (
            <StyledPlayerContainer>
              <H3 key={i}>{player.username}</H3>
              <CardContainer>
                {player.cards.map((card, i) => (
                  <UnnamedCard key={i} />
                ))}
                <MatContainer>
                  <UserMat status={player.matStatus} />
                </MatContainer>
              </CardContainer>
            </StyledPlayerContainer>
          ))}
        </PlayersContainer>
      )}
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PlayersContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StyledPlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  width: 20%;
  border: 1px solid black;
  border-radius: 4px;
  padding: 10px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const MatContainer = styled.div`
  padding: 10px;
  margin: 10px;
  border: 1px solid black;
  border-radius: 4px;
`;
