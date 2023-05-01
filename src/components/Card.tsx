import React from "react";

type CardProps = {
  onClick: any;
  id?: number;
  isRose?: boolean;
};

export const Card: React.FC<CardProps> = ({ onClick, id, isRose }) => {
  // console.log({ onClick, id, isRose });
  return (
    <div
      onClick={() => {
        onClick(id, isRose);
      }}
    >
      <h2>Rose Card</h2>
    </div>
  );
};
