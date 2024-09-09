import React from "react";
import SkullHero from "../images/SkullHero.jpg";
import { CreateRoomButton, JoinRoom } from "../components";

export const Home: React.FC = () => {
  return (
    <div>
      <div>
        <img style={{ width: 200 }} alt="home-page-hero" src={SkullHero} />
      </div>
      <CreateRoomButton />
      <JoinRoom />
    </div>
  );
};
