import React, { useContext, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { useNavigate } from "react-router-dom";
import type { JoinRoom as JoinRoomType } from "../../types/Types";
import { Button } from "../UI/Button";
import styled from "styled-components";
import { Input } from "../UI/Input";

export const JoinRoom: React.FC = () => {
  const { socket, setRoom, setCurrentUser } = useContext(SocketContext);
  const navigate = useNavigate();
  const [roomToJoin, setRoomToJoin] = useState<string>();

  const joinRoom = () => {
    console.log("join room input");
    socket?.emit("join_room", roomToJoin, (joinRoom: JoinRoomType) => {
      navigate(`/room/${joinRoom.room.roomId}`);
      setRoom(joinRoom.room);
      setCurrentUser(joinRoom.currentUser);
    });
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
