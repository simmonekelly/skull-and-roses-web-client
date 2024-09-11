import React from "react";
import { styled } from "styled-components";
import LocalPlayRoundedIcon from "@mui/icons-material/LocalPlayRounded";

export const OpponentCard: React.FC = () => {
  return (
    <Container>
      <LocalPlayRoundedIcon />
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
  margin: 10px;
  display: flex;
  border: 1px solid black;
  border-radius: 4px;
`;
