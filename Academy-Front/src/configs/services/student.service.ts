import { api, ResponseAPI } from "./api.service";

export async function fetchStudentsService(): Promise<ResponseAPI> {
  try {
    const response = await api.get("/students");

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
