import axios from "axios";
import { Character } from "../../store/modules/characters/charactersTypes";

export interface ResponseAPI {
  ok: boolean;
  message: string;
  data: Character[];
}

const baseURL = import.meta.env.VITE_API_BASE_URL;
export const api = axios.create({
  baseURL,
});
