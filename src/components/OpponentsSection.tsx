import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { OpponentCard } from "./OpponentCard";
import { styled } from "styled-components";

export const OpponentsSection: React.FC = () => {
  const { currentUser, room: currentRoom } = useContext(SocketContext);
  const filteredPlayers = currentRoom.players.filter(
    (player) => player.id !== currentUser.id
  );

  return (
    <StyledContainer>
      <h2>Other Players:</h2>
      <PlayersContainer>
        {filteredPlayers.map((filteredPlayer, i) => (
          <StyledPlayerContainer>
            <h3 key={i}>{filteredPlayer.id}</h3>
            {filteredPlayer.cards.map((card, i) => (
              <OpponentCard key={i} />
            ))}
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
`;
