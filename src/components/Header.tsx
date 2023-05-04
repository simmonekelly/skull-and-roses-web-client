import React from "react";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <div>
      <Link to="/">
        <h1>Skull & Roses</h1>
      </Link>
    </div>
  );
};
