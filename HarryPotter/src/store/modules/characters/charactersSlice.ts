import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCharacters } from "./charactersThunk";
import { Character, ResponseCharAPI } from "./charactersTypes";
import { ResponseAPI } from "../../../configs/services/api.service";

interface CharactersState {
  characters: Character[];
  loading: boolean;
  error: string;
}

const initialState: CharactersState = {
  characters: [],
  loading: false,
  error: "",
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        fetchCharacters.fulfilled,
        (state, action: PayloadAction<ResponseAPI<ResponseCharAPI>>) => {
          state.loading = false;
          if (action.payload.success) {
            state.error = "";
            state.characters = action.payload.data?.data || [];
          }
        }
      )
      .addCase(fetchCharacters.rejected, (state) => {
        console.log("Estou em estado de rejected na função loginAsyncThunk");
        state.loading = false;
        state.error = "Erro desconhecido";
      });
  },
});

export const charactersReducer = charactersSlice.reducer;
