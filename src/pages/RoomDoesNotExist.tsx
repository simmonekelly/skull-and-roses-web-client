import React from "react";
import { H2, Paragraph } from "../styles/styles";
import { Button } from "../components/UI/Button";
import { Header } from "../components/Home/Header";
import { useNavigate } from "react-router-dom";

export const RoomDoesNotExist: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header inRoom={false} />
      <H2>Woops!</H2>
      <Paragraph>Doesn't look like that room exists</Paragraph>
      <Paragraph>Head back to the hope page and try again</Paragraph>
      <Button onClick={() => navigate("/skull-and-roses-web-client")}>
        Back to Home
      </Button>
    </div>
  );
};
