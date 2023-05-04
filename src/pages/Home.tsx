import React, { useContext } from "react";
import SkullHero from "../images/SkullHero.jpg";
import { SocketContext } from "../context/SocketContext";
import { CreateRoomButton } from "../components";

type Props = {};

export const Home: React.FC<Props> = () => {
  const socket = useContext(SocketContext);

  //   socket?.socket?.emit("hello", "this is the provider");
  //can delet was just using for testing

  return (
    <div>
      <div>
        <img style={{ width: 200 }} alt="home-page-hero" src={SkullHero} />
      </div>
      <div>
        <CreateRoomButton />
      </div>
      <div>
        <input></input>
        <button>Join Room</button>
      </div>
    </div>
  );
};
