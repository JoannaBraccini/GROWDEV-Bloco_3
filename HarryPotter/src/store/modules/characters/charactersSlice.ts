// src/store/modules/characters/charactersSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { Character } from "./charactersTypes";
import { fetchCharactersThunk } from "./charactersThunk";

// Estado inicial
interface CharactersState {
  loading: boolean;
  data: Character[];
}

const initialState: CharactersState = {
  loading: false,
  data: [],
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCharactersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharactersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || [];
        console.log(state);
      })
      .addCase(fetchCharactersThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const charactersReducer = charactersSlice.reducer;
