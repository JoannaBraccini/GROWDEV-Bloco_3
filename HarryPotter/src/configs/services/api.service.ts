import axios from "axios";

export interface ResponseAPI<T> {
  success: boolean;
  message: string;
  data?: T;
}

const baseURL = import.meta.env.VITE_API_BASE_URL;
export const api = axios.create({
  baseURL,
});
