// src/store/modules/characters/charactersSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { Character } from "./charactersTypes";
import { fetchCharactersThunk } from "./charactersThunk";

// Estado inicial
interface CharactersState {
  success: boolean;
  message: string;
  loading: boolean;
  characters: Character[];
}

const initialState: CharactersState = {
  success: false,
  message: "",
  loading: false,
  characters: [],
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCharactersThunk.pending, (state) => {
        state.loading = true;
        console.log("pending");
      })
      .addCase(fetchCharactersThunk.fulfilled, (state, action) => {
        state.loading = false;
        console.log("state", state);
        if (!state.success) {
          state.success = false;
          state.message = "Erro, Fulfilled";
        } else {
          state.characters = action.payload || [];
          if (state.characters.length < 1) {
            state.success = false;
            state.message = "Erro. Array vazio";
          } else {
            state.success = true;
            state.message = "Sucesso";
          }
        }
      })
      .addCase(fetchCharactersThunk.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.message = "Erro, Rejected";
      });
  },
});

export const charactersReducer = charactersSlice.reducer;
