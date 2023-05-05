import React from "react";
import SkullHero from "../images/SkullHero.jpg";
import { CreateRoomButton, JoinRoom } from "../components";

type Props = {};

export const Home: React.FC<Props> = () => {
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
