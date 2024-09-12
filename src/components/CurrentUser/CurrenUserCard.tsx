import React, { useState } from "react";
import FilterVintageRoundedIcon from "@mui/icons-material/FilterVintageRounded";
import { Card } from "../UI/Card";
import { SubmitCardModal } from "./SubmitCardModal";

export type CardProps = {
  card: string;
  index: number;
};

export const CurrenUserCard: React.FC<CardProps> = ({ card, index }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card>
      <SubmitCardModal
        open={open}
        handleClose={handleClose}
        card={card}
        index={index}
      />
      <h1 onClick={() => handleOpen()}>
        {card === "rose" ? (
          <FilterVintageRoundedIcon />
        ) : (
          <span className="material-symbols-outlined">skull</span>
        )}
      </h1>
    </Card>
  );
};
