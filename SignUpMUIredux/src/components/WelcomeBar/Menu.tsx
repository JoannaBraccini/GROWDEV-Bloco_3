import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Link } from "@mui/material";

export function NavMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "white" }}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: {
            backgroundColor: "rgba(210, 88, 111)",
          },
        }}
      >
        <Link
          sx={{
            textDecoration: "none",
            color: "white",
          }}
          href="https://github.com/JoannaBraccini"
          target="_blank"
        >
          <MenuItem>GitHub</MenuItem>
        </Link>
        <Link
          sx={{
            textDecoration: "none",
            color: "white",
          }}
          href="https://www.linkedin.com/in/joannabraccini/"
          target="_blank"
        >
          <MenuItem>LinkedIn</MenuItem>
        </Link>
      </Menu>
    </Box>
  );
}
