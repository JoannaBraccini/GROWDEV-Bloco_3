import { SignupRequest } from "../../utils/types";
import { api, ResponseAPI } from "./api.service";

export async function signupService(data: SignupRequest): Promise<ResponseAPI> {
  try {
    const response = await api.post("/signup", data);

    return {
      ok: response.data.ok,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      ok: error.response.data.ok,
      message: error.response.data.message,
    };
  }
}
