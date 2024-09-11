import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { OpponentCard } from "./OpponentCard";
import { styled } from "styled-components";
import { UserMat } from "./UserMat";

export const OpponentsSection: React.FC = () => {
  const { currentUser, room: currentRoom } = useContext(SocketContext);
  const filteredPlayers = currentRoom.players.filter(
    (player) => player.id !== currentUser.id
  );

  return (
    <StyledContainer>
      <h2>Other Players:</h2>
      <PlayersContainer>
        {filteredPlayers.map((player, i) => (
          <StyledPlayerContainer>
            <h3 key={i}>{player.id}</h3>
            <CardContainer>
              {player.cards.map((card, i) => (
                <OpponentCard key={i} />
              ))}
              <MatContainer>
                <UserMat status={player.matStatus} />
              </MatContainer>
            </CardContainer>
          </StyledPlayerContainer>
        ))}
      </PlayersContainer>
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
