import React from "react";
import { styled } from "styled-components";
import { Blue, TABLET } from "../../styles/styles";

export const Card: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 10px;
  margin-bottom: 10px;
  display: flex;
  border: 1px solid black;
  border-radius: 4px;
  justify-content: center;
  background-color: ${Blue};
  width: 40px;
  height: 40px;

  @media (min-width: ${TABLET.min}px) {
    width: 100px;
    height: 100px;
  }
`;
