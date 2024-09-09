import React from "react";

type CardProps = {
  card: string;
};

export const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div>
      <h1>{card} </h1>
    </div>
  );
};
