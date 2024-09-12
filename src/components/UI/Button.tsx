import React from "react";
import styled from "styled-components";
import { Red } from "../../styles/styles";

type ButtonProps = {
  onClick: () => void;
  buttonType?: "solid" | "outlined";
};

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  onClick,
  buttonType = "solid",
  children,
}) => {
  const isSolid = Boolean(buttonType === "solid");

  return (
    <div>
      <StyledButton onClick={onClick} isSolid={isSolid}>
        {children}
      </StyledButton>
    </div>
  );
};

const StyledButton = styled.button<{ isSolid: Boolean }>`
  background-color: ${({ isSolid }) => (isSolid ? Red : "transparent")};
  border: ${({ isSolid }) => (isSolid ? "none" : `solid 1px ${Red}`)};
  border-radius: 4px;
  color: ${({ isSolid }) => (isSolid ? "white" : Red)};
  padding: 10px 20px;
  text-align: center;
  box-shadow: 10px 5px 5px rgb(37, 22, 5, 0.2);
  margin: 20px;
`;
