import React from "react";
import SkullHero from "../images/Skull_and_Crossbones.svg";
import Rose from "../images/Rose_flower.svg";
import { Header } from "../components/Home/Header";
import { CreateRoomButton } from "../components/Home/NewRoomButton";
import { JoinRoom } from "../components/Home/JoinRoom";
import styled from "styled-components";

export const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <MainContent>
        <ImageContainer>
          <img alt="home-page-hero" src={SkullHero} />
        </ImageContainer>
        <ButtonsContainer>
          <CreateRoomButton />
          <JoinRoom />
        </ButtonsContainer>
        <ImageContainer>
          <img alt="home-page-hero" src={Rose} />
        </ImageContainer>
      </MainContent>
    </div>
  );
};

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-top: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  height: 500px;
  padding: 0 20px;
`;
