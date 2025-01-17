import {
  DeleteStudentRequest,
  QueryStudentRequest,
  UpdateStudentRequest,
} from "../../utils/types";
import { api, ResponseAPI } from "./api.service";

export async function fetchStudentsService(
  query: QueryStudentRequest & { token: string }
): Promise<ResponseAPI> {
  const { token } = query;
  const params = new URLSearchParams();

  if (query.page) {
    params.set("page", String(query.page));
  }

  if (query.take) {
    params.set("take", String(query.take));
  }

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

export async function findOneStudentService(data: {
  id: string;
  token: string;
}): Promise<ResponseAPI> {
  const { id, token } = data;

  try {
    const response = await api.get(`/students/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export async function updateStudentService(
  data: UpdateStudentRequest & { token: string }
): Promise<ResponseAPI> {
  try {
    const { id, token, ...restData } = data;

    const response = await api.put(`/students/${id}`, restData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export async function deleteStudentService(
  data: DeleteStudentRequest & { token: string }
): Promise<ResponseAPI> {
  const { id, token } = data;

  try {
    const response = await api.delete(`/students/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
