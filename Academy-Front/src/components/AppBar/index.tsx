import React, { useState } from "react";
import {
  AppBar as AppBarMui,
  Box,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Toolbar,
  Button,
} from "@mui/material";
import {
  AccountCircle,
  Logout,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/modules/auth/userLoggedSlice";
import { toggleTheme } from "../../store/modules/settings/settingsSlice";
import { useNavigate } from "react-router-dom";
import { findStudentAsyncThunk } from "../../store/modules/students/studentsActions";
export default function AppBar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { student } = useAppSelector((state) => state.userLogged);
  const { mode } = useAppSelector((state) => state.settings);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfile = () => {
    dispatch(findStudentAsyncThunk(student.id));
    navigate(`/profile/${student.id}`);
  };

  return (
    <AppBarMui position="fixed" color="info">
      <Container>
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <img
            src="https://www.growdev.com.br/assets/images/logo_growdev.svg"
            style={{ width: "8rem", height: "auto", borderRadius: 10 }}
            onClick={() => navigate("/home")}
          />

          <Box>
            <Tooltip title="Configurações">
              <Button onClick={handleOpenUserMenu}>
                <Typography
                  textTransform="capitalize"
                  component="span"
                  variant="body1"
                  color="white"
                  mr={1}
                >
                  {student.name}
                </Typography>
                <Avatar
                  alt={student.name}
                  src="https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg"
                />
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleProfile}>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <AccountCircle />
                  Perfil
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(toggleTheme())}>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {mode === "light" ? <DarkMode /> : <LightMode />}
                  {mode === "light" ? "Dark mode" : "Light mode"}
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(logout())}>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Logout />
                  Sair
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBarMui>
  );
}
