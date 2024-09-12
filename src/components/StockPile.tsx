import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { UnnamedCard } from "./UnnamedCard";
import { styled } from "styled-components";
import Grid from "@mui/material/Grid2";
import { H2, Paragraph } from "../styles/styles";

export const StockPile: React.FC = () => {
  const { room: currentRoom } = useContext(SocketContext);

  return (
    <SectionContainer>
      <H2>StockPile:</H2>
      <Paragraph>Number of Cards: {currentRoom.stockPile.length}</Paragraph>
      {currentRoom.stockPile.length > 0 && (
        <StockPileContainer>
          <Grid container spacing={2} justifyContent={"center"}>
            {currentRoom.stockPile.map((card) => (
              <Grid size={2}>
                <UnnamedCard />
              </Grid>
            ))}
          </Grid>
        </StockPileContainer>
      )}
    </SectionContainer>
  );
};

const StockPileContainer = styled.div`
  // display: flex;
  // justify-content: center;
`;

const SectionContainer = styled.div`
  width: 60%;
  margin: auto;
  border: 1px solid black;
  border-radius: 4px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px 0;
  box-shadow: 10px 5px 5px rgb(0 0 0 / 20%);
`;
