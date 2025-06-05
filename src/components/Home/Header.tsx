import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { H1 } from "../../styles/styles";
import styled from "styled-components";
import { Room, User } from "../../types/firebaseTypes";
import { DatabaseReference } from "firebase/database";
import { DatabaseContext } from "../../context/DatabaseContext";

type Props = {
  inRoom: boolean;
  roomData?: Room;
  currentUser?: User;
  currentRoomRef?: DatabaseReference;
};

export const Header: React.FC<Props> = ({
  inRoom,
  currentUser,
  currentRoomRef,
  roomData,
}) => {
  const { removeUserFromRoom } = useContext(DatabaseContext);
  return inRoom ? (
    <Container>
      <Link
        to="/skull-and-roses-web-client"
        onClick={() => {
          removeUserFromRoom(currentUser!, currentRoomRef!, roomData!);
        }}
      >
        <H1>Skull & Roses</H1>
      </Link>
    </Container>
  ) : (
    <Container>
      <Link to="/skull-and-roses-web-client">
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
