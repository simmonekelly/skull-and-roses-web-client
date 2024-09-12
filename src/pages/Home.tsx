import React from "react";
import SkullHero from "../images/SkullHero.jpg";
import { Header } from "../components/Home/Header";
import { CreateRoomButton } from "../components/Home/NewRoomButton";
import { JoinRoom } from "../components/Home/JoinRoom";

export const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <div>
        <img style={{ width: 200 }} alt="home-page-hero" src={SkullHero} />
      </div>
      <CreateRoomButton />
      <JoinRoom />
    </div>
  );
};
