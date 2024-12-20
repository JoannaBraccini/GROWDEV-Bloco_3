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
        state.success = true;
        state.characters = action.payload || [];
      })
      .addCase(fetchCharactersThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.error.message || "Failed to fetch characters";
      });
  },
});

export const charactersReducer = charactersSlice.reducer;
