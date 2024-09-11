import React from "react";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import { styled } from "styled-components";

type MatProps = {
  status: boolean;
};

export const UserMat: React.FC<MatProps> = ({ status }) => {
  return (
    <Container>
      <h3>Mat</h3>
      {status && <ThumbUpOffAltRoundedIcon />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
