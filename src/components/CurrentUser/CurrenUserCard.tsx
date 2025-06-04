import React, { useState } from "react";
import FilterVintageRoundedIcon from "@mui/icons-material/FilterVintageRounded";
import { Card as CardComponent } from "../UI/Card";
import { SubmitCardModal } from "./SubmitCardModal";
import { UpdateRoomProps, Card, CardType } from "../../types/firebaseTypes";

export type CardProps = UpdateRoomProps & {
  card: Card;
  // submittedCardKey: number;
};

export const CurrenUserCard: React.FC<CardProps> = ({
  card,
  // submittedCardKey,
  currentUser,
  currentRoomRef,
  roomData,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <CardComponent>
      <SubmitCardModal
        open={open}
        handleClose={handleClose}
        card={card}
        // submittedCardKey={submittedCardKey}
        currentUser={currentUser}
        currentRoomRef={currentRoomRef}
        roomData={roomData}
      />
      <h1 onClick={() => handleOpen()}>
        {card.type === CardType.Rose ? (
          <FilterVintageRoundedIcon />
        ) : (
          <span className="material-symbols-outlined">skull</span>
        )}
      </h1>
    </CardComponent>
  );
};
