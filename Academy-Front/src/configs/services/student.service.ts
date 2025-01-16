import { QueryStudentRequest } from "../../utils/types";
import { api, ResponseAPI } from "./api.service";

export async function fetchStudentsService(
  query: QueryStudentRequest & { token: string }
): Promise<ResponseAPI> {
  const { token } = query;
  const params = new URLSearchParams();

  if (query.cpf) {
    params.set("cpf", String(query.cpf));
  }
  if (query.name) {
    params.set("name", String(query.name));
  }

  try {
    const response = await api.get("/students", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

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
