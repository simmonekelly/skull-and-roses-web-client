import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../UI/Button";
import styled from "styled-components";
import { Input } from "../UI/Input";

export const JoinRoom: React.FC = () => {
  const navigate = useNavigate();
  const [roomToJoin, setRoomToJoin] = useState<string>();

  const joinRoom = () => {
    navigate(`/room/${roomToJoin}`);
    console.log("join room input");
  };

  return (
    <Container>
      <Input placeholderText="Input Room Name" handleOnChange={setRoomToJoin} />
      <Button onClick={joinRoom} buttonType="outlined">
        Join Room
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;
