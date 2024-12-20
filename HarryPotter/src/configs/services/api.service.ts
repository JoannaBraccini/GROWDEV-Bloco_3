import axios from "axios";

export interface ResponseAPI<T> {
  ok: boolean;
  message: string;
  data?: T;
}

const baseURL = import.meta.env.VITE_BASE_API_URL;

export const api = axios.create({
  baseURL,
});
