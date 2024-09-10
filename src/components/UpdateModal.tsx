import React, { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

type Props = {};

export const UpdateModal: React.FC<Props> = () => {
  const { socket, currentUser } = useContext(SocketContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [message, setMessage] = useState<string>("");

  socket?.on("show_update_modal", () => {
    handleOpen();
    setMessage("congrats, you won!");
    // console.log({ currentRoom, room, action: "update room" });
    // setRoom(room);
  });

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>{message}</Box>
      </Modal>
    </div>
  );
};
