import React from "react";

type UserDisplayProps = {
  id?: number;
};

export const UserDisplay: React.FC<UserDisplayProps> = ({ id }) => {
  console.log({ id });
  return (
    <div>
      <h2>User: {id} has joined</h2>
    </div>
  );
};
