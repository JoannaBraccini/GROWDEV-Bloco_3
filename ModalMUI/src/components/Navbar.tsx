import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import { ModalBox } from "./Modal";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="transparent">
        <Toolbar>
          <Tooltip title="Porque todo dev precisa descansar de vez em quando">
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2, color: "#ff3366" }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Typography
            variant="h5"
            fontWeight="800"
            color="white"
            sx={{ flexGrow: 1 }}
          >
            TRAVEL DEV
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleClickOpen}
            sx={{ backgroundColor: "#ff3366" }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <ModalBox open={open} onClose={handleClose} />
    </Box>
  );
}
