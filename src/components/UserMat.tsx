import React from "react";

type MatProps = {
  status: boolean;
};

export const UserMat: React.FC<MatProps> = ({ status }) => {
  return (
    <>
      <h1>Mat</h1>
      <p>{status ? "one more win away from winning the game" : "skull"}</p>
    </>
  );
};
