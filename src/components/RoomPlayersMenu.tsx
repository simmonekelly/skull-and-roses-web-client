import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { SocketContext } from "../context/SocketContext";
import PersonIcon from "@mui/icons-material/Person";
import { styled } from "styled-components";
import { Divider } from "@mui/material";

export const RoomPlayersMenu: React.FC = () => {
  const { room: currentRoom } = useContext(SocketContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="outlined"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Players: {<PersonIcon />} {currentRoom.players.length}
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
        <MenuItem>
          <UsersInRoom>
            Users in Room:
            <ul>
              {currentRoom.players.map((player) => (
                <li>{player.id}</li>
              ))}
            </ul>
          </UsersInRoom>
        </MenuItem>
        <Divider variant="middle" />
        <MenuItem onClick={handleClose}>Invite Users</MenuItem>
      </Menu>
    </div>
  );
};

const UsersInRoom = styled.div`
  display: flex;
  flex-direction: column;
`;
