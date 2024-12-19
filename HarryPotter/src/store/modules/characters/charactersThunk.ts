import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../configs/services/api.service";

export const fetchCharactersThunk = createAsyncThunk(
  "characters/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/characters");
      console.log("thunk", response);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("thunk", error);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
