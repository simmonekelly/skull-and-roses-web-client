import Face6Icon from "@mui/icons-material/Face6";
import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { UpdateRoomProps } from "../../types/firebaseTypes";
import { DatabaseContext } from "../../context/DatabaseContext";

export const CurrentUserButton: React.FC<UpdateRoomProps> = ({
  currentUser,
  currentRoomRef,
  roomData,
}) => {
  const navigate = useNavigate();
  const { removeUserFromRoom } = useContext(DatabaseContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const leaveRoom = () => {
    console.log("leave room");
    removeUserFromRoom(currentUser, currentRoomRef, roomData);
    navigate(`/skull-and-roses-web-client`);
  };

  return (
    <div>
      <Button
        variant="contained"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Container>
          {<Face6Icon />} {currentUser.username}
        </Container>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={leaveRoom}>Leave Room</MenuItem>
        <MenuItem onClick={leaveRoom}>Home</MenuItem>
      </Menu>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  width: 230px;
  flex-direction: row;
  justify-content: space-around;
`;
