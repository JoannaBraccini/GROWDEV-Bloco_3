import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../configs/services/api.service";
import { Character } from "./charactersTypes";

export const fetchCharactersThunk = createAsyncThunk<Character[]>(
  "characters/fetchAll",
  async () => {
    try {
      const response = await api.get("/characters");
      console.log("API Response:", response);

      if (response.data) {
        console.log("Characters Data:", response.data);
        return response.data;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("API Error:", error);
      return error.response.message;
    }
  }
);
