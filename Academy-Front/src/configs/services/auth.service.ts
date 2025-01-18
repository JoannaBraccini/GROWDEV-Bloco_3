import { useNavigate } from "react-router-dom";
import { LoginRequest, SignupRequest } from "../../utils/types";
import { api, ResponseAPI } from "./api.service";

export async function loginService(
  data: Omit<LoginRequest, "remember">
): Promise<ResponseAPI> {
  try {
    const response = await api.post("/login", data);

    return {
      ok: response.data.ok,
      message: response.data.message,
      data: response.data.data, //student, token
    };
  } catch (error: any) {
    return {
      ok: error.response.data.ok,
      message: error.response.data.message,
    };
  }
}

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

//Fazer logout ao receber a resposta "Não autenticado"
export default api.interceptors.response.use(
  (response) => {
    // Caso a resposta seja bem-sucedida, continua
    return response;
  },
  (error) => {
    const navigate = useNavigate(); //Caso erro

    if (
      error.response?.data?.message === "Não autenticado!" &&
      error.response?.data?.ok === false
    ) {
      // Remove os dados do usuário do localStorage/sessionStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");

      // Redirecione para a tela de login
      navigate("/login");
    }

    // Retorne a promessa rejeitada para lidar com erros específicos localmente
    return Promise.reject(error);
  }
);
