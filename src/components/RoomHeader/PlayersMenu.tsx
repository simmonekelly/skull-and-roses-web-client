import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import { styled } from "styled-components";
import { Divider } from "@mui/material";
import { Room } from "../../types/firebaseTypes";

type Props = {
  players: Room["players"];
};

export const PlayersMenu: React.FC<Props> = ({ players }) => {
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
        Players: {<PersonIcon />} {players.length}
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
              {players.map((player) => (
                <li>{player.username}</li>
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
