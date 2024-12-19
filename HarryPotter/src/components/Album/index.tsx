import { Info } from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  ListSubheader,
  Menu,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Character } from "../../store/modules/characters/charactersTypes";
import { fetchCharactersThunk } from "../../store/modules/characters/charactersThunk";
// import { characters } from "../../mock/characters";

export function Album() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const dispatch = useAppDispatch();
  const { loading, characters, message } = useAppSelector(
    (state) => state.characters
  );

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    char: Character
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedChar(char);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedChar(null);
  };

  useEffect(() => {
    console.log("effect", characters);
    if (!loading && !characters) {
      console.log("erro fetch array");

      dispatch(fetchCharactersThunk);
    }
  }, [characters, loading, dispatch, message]);

  return (
    <Box sx={{ width: "100%", height: "90vh", overflowY: "scroll" }}>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <ImageList variant="masonry" cols={3} gap={8}>
          <ImageListItem key="Subheader" cols={2}>
            <ListSubheader
              sx={{
                backgroundColor: "transparent",
                color: "white",
                fontWeight: 700,
                fontSize: 40,
              }}
              component="div"
            >
              PERSONAGENS
            </ListSubheader>
          </ImageListItem>
          {characters.map((char) => (
            <ImageListItem key={char.id}>
              <img
                srcSet={`${char.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${char.image}?w=248&fit=crop&auto=format`}
                alt={char.name}
                loading="lazy"
              />
              <ImageListItemBar
                title={char.name}
                subtitle={char.alternateNames.join(", ")}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${char.name}`}
                    onClick={(event) => handleOpenMenu(event, char)}
                  >
                    <Info />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: 1,
            borderRadius: 1,
          },
        }}
      >
        {selectedChar && (
          <>
            <MenuItem disabled>
              {selectedChar.alive ? "Vivo" : "Morto"}
            </MenuItem>
            <MenuItem disabled>
              {selectedChar.wizard ? "Bruxo" : "Trouxa"}
            </MenuItem>
            {selectedChar.hogwartsStaff && (
              <MenuItem disabled>Funcionário(a)</MenuItem>
            )}
            {selectedChar.hogwartsStudent && (
              <MenuItem disabled>Estudante</MenuItem>
            )}
            <MenuItem disabled>Espécie: {selectedChar.species}</MenuItem>
            <MenuItem disabled>Gênero: {selectedChar.gender}</MenuItem>
            <MenuItem disabled>Casa: {selectedChar.house}</MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
}
