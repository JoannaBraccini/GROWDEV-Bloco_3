import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, ResponseAPI } from "../../../configs/services/api.service";
import { ResponseCharAPI } from "./charactersTypes";

export const fetchCharacters = createAsyncThunk<
  ResponseAPI<ResponseCharAPI>, //tipo de dados que quero receber, um array de chars
  void, //o que será enviado (nesse caso, nada)
  { rejectValue: string } //tipo de arquivo de reject
>("characters/fetchCharacters", async (_, ThunkAPI) => {
  try {
    const response = await api.get<ResponseAPI<ResponseCharAPI>>("/characters");
    return response.data; //resposta completa
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Erro ao buscar personagem";
    return ThunkAPI.rejectWithValue(errorMessage); // somente a mensagem de erro
  }
});
