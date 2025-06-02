import React from "react";
import { UnnamedCard } from "./UnnamedCard";
import { styled } from "styled-components";
import Grid from "@mui/material/Grid2";
import { H2, Paragraph } from "../styles/styles";
import type { Room } from "../types/firebaseTypes";

export const StockPile: React.FC<Room> = ({ stockPile }) => {
  return (
    <SectionContainer>
      <H2>StockPile:</H2>
      <Paragraph>
        Number of Cards:
        {stockPile?.length || 0}
      </Paragraph>
      {stockPile?.length !== undefined && stockPile?.length > 0 && (
        <div>
          <Grid container spacing={2} justifyContent={"center"}>
            {stockPile?.map((card: any) => (
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
