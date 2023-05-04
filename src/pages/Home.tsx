import React from "react";
import SkullHero from "../images/SkullHero.jpg";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

type Props = {};

export const Home: React.FC<Props> = () => {
  const socket = useContext(SocketContext);

  socket?.socket?.emit("hello", "this is the provider");
  socket?.socket?.emit("create_room");

  return (
    <div>
      <div>
        <img style={{ width: 200 }} alt="home-page-hero" src={SkullHero} />
      </div>
    </div>
  );
};
