import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../configs/services/api.service";
import { Character } from "./charactersTypes";
import { showAlert } from "../alert/AlertSlice";

export const fetchCharactersThunk = createAsyncThunk<Character[]>(
  "characters/fetchAll",
  async (_, { dispatch }) => {
    try {
      const response = await api.get("/characters");

      if (!response.data) {
        dispatch(
          showAlert({
            message: "Erro ao buscar dados da API",
            type: "error",
          })
        );
      }
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return error.response.message;
    }
  }
);
