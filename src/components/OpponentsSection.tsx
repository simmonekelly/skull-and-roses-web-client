import React from "react";
import { UnnamedCard } from "./UnnamedCard";
import { styled } from "styled-components";
import { UserMat } from "./UserMat";
import { H2, H3 } from "../styles/styles";
import type { CurrentRoom } from "../types/firebaseTypes";

export const OpponentsSection: React.FC<CurrentRoom> = ({
  roomData,
  currentUser,
}) => {
  // Create an object of opponent players by excluding the currentUser
  // The `_omittedCurrentUser` variable is created but not used, which is a common pattern for excluding a property.
  const { [currentUser.id]: _omittedCurrentUser, ...opponentPlayers } =
    roomData.players;

  return (
    <StyledContainer>
      <H2>Other Players:</H2>
      {/* Render only if there are opponent players */}
      {Object.keys(opponentPlayers).length > 0 && (
        <PlayersContainer>
          {Object.values(opponentPlayers).map((player) => (
            // Use player.id for the key, which is more stable and a React best practice
            <StyledPlayerContainer key={player.id}>
              <H3>{player.username}</H3>
              <CardContainer>
                {/* Ensure 'cards' exists and is an array before mapping */}
                {player.cards &&
                  Object.entries(player.cards).map(([index, card]) => (
                    // Using cardIndex as a key if card objects don't have unique IDs
                    <UnnamedCard key={index} />
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
