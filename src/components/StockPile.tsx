import React from "react";
import { UnnamedCard } from "./UnnamedCard";
import { styled } from "styled-components";
import Grid from "@mui/material/Grid2";
import { H2, Paragraph } from "../styles/styles";
import type { Room } from "../types/firebaseTypes";

export const StockPile: React.FC<Room> = ({ stockPile }) => {
  const isStockPileEmpty = stockPile === null || stockPile === undefined;

  return (
    <SectionContainer>
      <H2>StockPile:</H2>
      <Paragraph>
        Number of Cards:
        {isStockPileEmpty ? 0 : Object.keys(stockPile).length}
      </Paragraph>
      {!isStockPileEmpty && Object.keys(stockPile).length > 0 && (
        <div>
          <Grid container spacing={2} justifyContent={"center"}>
            {Object.entries(stockPile).map(([index, card]) => (
              <Grid size={2}>
                <UnnamedCard />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </SectionContainer>
  );
};

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
