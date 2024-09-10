import React from "react";

type MatProps = {
  shouldShow: boolean;
};

export const UserMat: React.FC<MatProps> = ({ shouldShow }) => {
  return (
    <div>
      <h1>Mat</h1>
      {shouldShow ? "one more win away from winning the game" : "skull"}
    </div>
  );
};
