import { Info } from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  ListSubheader,
  Menu,
  MenuItem,
  Pagination,
  Stack,
} from "@mui/material";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Character } from "../../store/modules/characters/charactersTypes";
import { fetchCharactersThunk } from "../../store/modules/characters/charactersThunk";
import { clearSearchField } from "../../store/modules/characters/charactersSlice";
import { showAlert } from "../../store/modules/alert/AlertSlice";

export function Album() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const dispatch = useAppDispatch();
  const { loading, characters, searchField } = useAppSelector(
    (state) => state.characters
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredCharacters =
    searchField === ""
      ? characters
      : characters.filter((char) => {
          const search = searchField.toLowerCase();
          return (
            char.name.toLowerCase().includes(search) ||
            char.house?.toLowerCase().includes(search)
          );
        });

  const paginatedCharacters = filteredCharacters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

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
    dispatch(fetchCharactersThunk());
    dispatch(clearSearchField());
  }, [dispatch]);

  useEffect(() => {
    if (searchField && filteredCharacters.length === 0) {
      dispatch(
        showAlert({
          message: `Nenhum personagem encontrado para "${searchField}".`,
          type: "error",
        })
      );
    }
  }, [searchField, filteredCharacters, dispatch]);

  useEffect(() => {
    if (!selectedChar && anchorEl) {
      dispatch(
        showAlert({
          message: "Personagem não encontrado ou inválido.",
          type: "error",
        })
      );
      setAnchorEl(null); // Fecha o menu caso o personagem seja inválido
    }
  }, [selectedChar, anchorEl, dispatch]);

  return (
    <Box sx={{ width: "100%", height: "90vh", overflowY: "scroll" }}>
      {loading ? (
        <Box
          sx={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size="80px" color="error" />
        </Box>
      ) : (
        <>
          <ImageList variant="masonry" cols={3} gap={8}>
            <ImageListItem key="Subheader" cols={2}>
              <ListSubheader
                sx={{
                  backgroundColor: "transparent",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 40,
                  display: "flex",
                  justifyContent: "center",
                }}
                component="div"
              >
                PERSONAGENS
              </ListSubheader>
            </ImageListItem>

            {paginatedCharacters?.map((char) => (
              <ImageListItem key={char.id}>
                {char.image ? (
                  <img
                    srcSet={`${char.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${char.image}?w=248&fit=crop&auto=format`}
                    alt={char.name}
                    loading="lazy"
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: 140,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                      color: "white",
                      fontSize: 18,
                      fontWeight: 700,
                    }}
                  >
                    Sem Imagem
                  </Box>
                )}
                <ImageListItemBar
                  title={char.name}
                  subtitle={char.alternate_names?.join(", ")}
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
          <Stack
            spacing={2}
            sx={{
              mb: 6,
              mx: "auto",
              alignItems: "center",
              backgroundColor: "white",
              maxWidth: "25%",
            }}
          >
            <Pagination
              count={Math.ceil(filteredCharacters.length / itemsPerPage)}
              variant="outlined"
              shape="rounded"
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </>
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
              {selectedChar.wizard ? "Bruxo" : "Não Bruxo"}
            </MenuItem>
            {selectedChar.hogwartsStaff && (
              <MenuItem disabled>Funcionário(a)</MenuItem>
            )}
            {selectedChar.hogwartsStudent && (
              <MenuItem disabled>Estudante</MenuItem>
            )}
            <MenuItem disabled>
              {selectedChar.species === "human"
                ? "Humano"
                : selectedChar.species}
            </MenuItem>
            <MenuItem disabled>
              {selectedChar.gender === "male"
                ? "Masculino"
                : selectedChar.gender === "female"
                ? "Feminino"
                : selectedChar.gender}
            </MenuItem>
            {selectedChar.house && (
              <MenuItem disabled>{selectedChar.house} </MenuItem>
            )}
          </>
        )}
      </Menu>
    </Box>
  );
}
