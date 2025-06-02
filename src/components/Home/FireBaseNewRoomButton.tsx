import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../UI/Button";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { DatabaseContext } from "../../context/DatabaseContext";
import { ref, update } from "firebase/database"; // <-- Import RTDB methods
import { Input } from "../UI/Input";
import { createUser } from "../../utils/createAUser";
import styled from "styled-components";

type CreateRoomButtonProps = {};

export const CreateRoomButton: React.FC<CreateRoomButtonProps> = () => {
  const [username, setUsername] = useState<string>("");

  const { database } = useContext(DatabaseContext);
  const navigate = useNavigate();

  const roomsRef = ref(database, "/rooms");

  const createNewRoom = async () => {
    const currentUser = createUser(username, true);
    sessionStorage.setItem("currentUserNameId", currentUser.id);

    const roomName: string = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: "-",
    });

    const newRoom = {
      name: roomName,
      createdAt: new Date(),
      players: [currentUser],
      stockPile: [],
    };

    try {
      await update(roomsRef, { [roomName]: newRoom });
      console.log(`${roomName}Room added successfully!`);
    } catch (error) {
      console.error("Error adding new room: ", error);
    }
    navigate(`/room/${roomName}`);
  };

  return (
    <Container>
      <Input placeholderText="Input Username" handleOnChange={setUsername} />
      <Button onClick={createNewRoom} buttonType="solid">
        Create New Room
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
