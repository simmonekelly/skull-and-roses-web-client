import React from "react";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import { styled } from "styled-components";
import { H3 } from "../styles/styles";

type MatProps = {
  status: boolean;
};

export const UserMat: React.FC<MatProps> = ({ status }) => {
  return (
    <Container>
      <H3>Score Card</H3>
      {status && <ThumbUpOffAltRoundedIcon />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
