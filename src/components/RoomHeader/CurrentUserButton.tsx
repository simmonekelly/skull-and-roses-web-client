import Face6Icon from "@mui/icons-material/Face6";
import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { SocketContext } from "../../context/SocketContext";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

export const CurrentUserButton: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(SocketContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHomeNav = () => {
    navigate(`/`);
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
          {<Face6Icon />} {currentUser.id}
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
        <MenuItem onClick={handleClose}>Leave Room</MenuItem>
        <MenuItem onClick={handleHomeNav}>Home</MenuItem>
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
