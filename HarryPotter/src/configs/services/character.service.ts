import { Character } from "../../store/modules/characters/charactersTypes";
import { api, ResponseAPI } from "./api.service";

export async function fetchCharactersService(): Promise<
  ResponseAPI<Character[]>
> {
  try {
    const response = await api.get("/characters");
    console.log("service", response);

    return {
      ok: response.data.ok,
      message: response.data.message,
      data: response.data.data,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("service", error);
    return {
      ok: error.response.data.ok,
      message: error.response.data.message,
      data: [],
    };
  }
}
