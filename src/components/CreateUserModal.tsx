import React, { useContext, useState } from "react";
import { Modal } from "./Modal";
import { Input } from "./UI/Input";
import { createUser } from "../utils/createAUser";
import { Room } from "../types/firebaseTypes";
import { DatabaseContext } from "../context/DatabaseContext";
import { DatabaseReference } from "firebase/database";

type Props = {
  isOpen: boolean;
  currentRoomRef: DatabaseReference;
  roomData: Room;
};

export const CreateUserModal: React.FC<Props> = ({
  isOpen,
  currentRoomRef,
  roomData,
}) => {
  const { addUserToRoom } = useContext(DatabaseContext);

  const [username, setUsername] = useState<string>("");

  const onClose = () => {
    const currentUser = createUser(username, false);
    addUserToRoom(currentUser, currentRoomRef, roomData);
    sessionStorage.setItem("currentUserNameId", currentUser.id);
  };

  const content = (
    <>
      <Input placeholderText="Input Username" handleOnChange={setUsername} />
    </>
  );

  return (
    <Modal
      open={isOpen}
      handleClose={onClose}
      title="Please enter a username"
      content={content}
      buttonText="Create User"
    />
  );
};
