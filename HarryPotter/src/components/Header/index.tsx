import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { Search, SearchIconWrapper, StyledTextField } from "./style";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSearchField } from "../../store/modules/characters/charactersSlice";

export function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();
  const characters = useAppSelector((state) => state.characters.characters);

  const filteredCharacters = characters.filter((char) => {
    return (
      char.name.toLowerCase().includes(search.toLowerCase()) ||
      char.house?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null); //pra conseguir fechar o menu desobediente
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(setSearchField(search));
    setSearch("");
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
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={!!anchorEl}
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
          <Search onSubmit={handleSearch} sx={{ flexGrow: 0.5 }}>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "white" }} />
            </SearchIconWrapper>
            <Autocomplete
              freeSolo
              value={search}
              options={filteredCharacters.map(
                (char) => char.name || char.house
              )}
              onInputChange={(_e, newInputValue) => setSearch(newInputValue)}
              renderInput={(params) => (
                <StyledTextField>
                  <TextField
                    {...params}
                    placeholder="Pesquisar..."
                    variant="outlined"
                    size="small"
                  />
                </StyledTextField>
              )}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
