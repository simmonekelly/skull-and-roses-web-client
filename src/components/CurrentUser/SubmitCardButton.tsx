import React from "react";
import Button from "@mui/material/Button";

type Props = {
  handleSubmit: () => void;
};

export const SubmitCardButton: React.FC<Props> = ({ handleSubmit }) => {
  return (
    <div>
      <Button onClick={handleSubmit}>Submit Card</Button>
    </div>
  );
};
