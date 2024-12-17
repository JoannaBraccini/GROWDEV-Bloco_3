import {
  styled,
  alpha,
  InputBase,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="transparent"
        sx={{ boxShadow: "-2px 8px 5px 0px rgba(0,0,0,0.53);" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="abrir api"
            sx={{ mr: 2, color: "white" }}
            onClick={handleMenu}
          >
            <MenuIcon />
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() =>
                  window.open("https://github.com/JoannaBraccini", "_blank")
                }
              >
                GitHub
              </MenuItem>
              <MenuItem
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/joannabraccini/",
                    "_blank"
                  )
                }
              >
                LinkedIn
              </MenuItem>
              <MenuItem
                onClick={() =>
                  window.open("https://hp-api.onrender.com/", "_blank")
                }
              >
                Documentação API
              </MenuItem>
            </Menu>
          </IconButton>
          <Typography
            variant="h6"
            fontWeight={700}
            noWrap
            component="div"
            onClick={() =>
              window.open("https://www.harrypotter.com/", "_blank")
            }
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block", color: "white" },
            }}
          >
            NOTÍCIAS
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "white" }} />
            </SearchIconWrapper>
            <StyledInputBase
              sx={{ color: "white" }}
              placeholder="Pesquisar..."
              inputProps={{ "aria-label": "pesquisar" }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
