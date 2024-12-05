import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { CurrencyExchangeTwoTone } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { purple } from "@mui/material/colors";

const pages = ["Painel", "Conta"];

export function Header() {
  const [alignment, setAlignment] = React.useState("Painel");
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>, //sublinhado para prevenir warning, retirar caso precise usar
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const handlePageChange = (page: string) => {
    if (page === "Painel") {
      navigate("/");
    } else {
      navigate(`/${page.toLowerCase()}`);
    }
    setAnchorElNav(null); // Fecha o menu após a navegação (mobile)
  };

  function handleLogout() {
    alert("Deslogou!");
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: purple[700] }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CurrencyExchangeTwoTone
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: "#dabc12",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mx: 3,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FINANCEIRO ONLINE
          </Typography>
          {/* Menu mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handlePageChange(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Menu em telas grandes */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <ToggleButtonGroup
              aria-label="Página"
              value={alignment}
              exclusive
              color="warning"
              onChange={handleChange}
            >
              {pages.map((page) => (
                <ToggleButton
                  key={page}
                  value={page}
                  sx={{ color: "white" }}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          {/* Avatar */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Configurações">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Usuário" src="/static/images/avatar/2.jpg" />
              </IconButton>
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
              <MenuItem key={"logout"} onClick={handleCloseUserMenu}>
                <Typography
                  onClick={() => handleLogout()}
                  sx={{ textAlign: "center" }}
                >
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
