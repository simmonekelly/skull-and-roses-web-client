import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SkullHero from "../images/SkullHero.jpg";

type Props = {
  roomId?: string;
  socket?: any;
  setRoomId?: any;
  displayUsers?: any;
  users?: any;
  userId?: any;
  setUserId?: any;
};

export const Home: React.FC<Props> = ({
  roomId,
  socket,
  setRoomId,
  displayUsers,
  users,
  userId,
  setUserId,
}) => {
  const [roomToJoin, setRoomToJoin] = useState("");
  const navigate = useNavigate();

  // //creating a new room
  const createNewRoom = () => {
    console.log("create new room");
    socket.emit("create_room", (roomId: any) => {
      console.log(`room created data: ${roomId} and ${socket.id}`);

      setRoomId(roomId);
      setUserId(socket.id);
      displayUsers(socket.id);
    });
  };

  // join a room
  //need to figure out why when you join a room, display users
  //doesnt update for the user that joined a room
  const joinRoom = () => {
    if (roomId != null) {
      console.log(`joining ${roomToJoin}`);
      socket.emit("join_room", { roomToJoin }, (roomId: any) => {
        console.log(`room joined data: ${roomId} and ${socket.id}`);
        setRoomId(roomId);
        setUserId(socket.id);
        displayUsers(socket.id);
      });
    }
  };

  useEffect(() => {
    if (roomId) {
      navigate(`room/${roomId}`);
    }
  }, [roomId]);
  return (
    <div>
      <div>
        <img style={{ width: 200 }} alt="home-page-hero" src={SkullHero} />
      </div>
      <button onClick={createNewRoom}>Create New Room</button>
      <div>
        <input
          placeholder="Input Room Name To Join"
          onChange={(event) => {
            setRoomToJoin(event.target.value);
          }}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
    </div>
  );
};
