import React, { useContext, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { useNavigate } from "react-router-dom";
import type { JoinRoom as JoinRoomType } from "../../types/Types";
import { Button } from "../UI/Button";
import styled from "styled-components";
import { Input } from "../UI/Input";
import { createUser } from "../../utils/createAUser";

export const JoinRoom: React.FC = () => {
  const navigate = useNavigate();
  const [roomToJoin, setRoomToJoin] = useState<string>();
  const [username, setUsername] = useState<string>("");

  const joinRoom = () => {
    const currentUser = createUser(username, false);

    console.log("join room input");
  };

  return (
    <Container>
      <Input placeholderText="Input Username" handleOnChange={setUsername} />
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
