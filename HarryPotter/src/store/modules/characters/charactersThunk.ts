import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCharactersService } from "../../../configs/services/character.service";

export const fetchCharactersThunk = createAsyncThunk(
  "characters/fetchAll",
  async () => {
    const response = await fetchCharactersService();

    if (!response.ok) {
      console.log(response);
    }

    return response;
  }
);
