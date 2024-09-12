import React from "react";
import { styled } from "styled-components";
import { Blue } from "../../styles/styles";

export const Card: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin: 10px;
  display: flex;
  border: 1px solid black;
  border-radius: 4px;
  justify-content: center;
  background-color: ${Blue};
  width: 100px;
`;
