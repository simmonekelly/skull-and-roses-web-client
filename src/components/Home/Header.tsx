import React from "react";
import { Link } from "react-router-dom";
import { H1 } from "../../styles/styles";
import styled from "styled-components";

export const Header: React.FC = () => {
  return (
    <Container>
      <Link to="/">
        <H1>Skull & Roses</H1>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;
