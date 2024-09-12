import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { UnnamedCard } from "./UnnamedCard";
import { styled } from "styled-components";
import { UserMat } from "./UserMat";
import { H2, H3 } from "../styles/styles";

export const OpponentsSection: React.FC = () => {
  const { currentUser, room: currentRoom } = useContext(SocketContext);
  const filteredPlayers = currentRoom.players.filter(
    (player) => player.id !== currentUser.id
  );

  return (
    <StyledContainer>
      <H2>Other Players:</H2>
      {currentRoom.players.length > 1 && (
        <PlayersContainer>
          {filteredPlayers.map((player, i) => (
            <StyledPlayerContainer>
              <H3 key={i}>{player.id}</H3>
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
