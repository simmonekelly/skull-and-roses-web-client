import React from "react";
import { Modal } from "../Modal";

type Props = {
  open: boolean;
};

export const OtherUsersTurnModal: React.FC<Props> = ({ open }) => {
  return (
    <Modal
      open={open}
      handleClose={() => {}}
      title="Other User's Turn"
      content="Please wait for the other user to make a move"
      disableEscapeKeyDown={true}
    />
  );
};
