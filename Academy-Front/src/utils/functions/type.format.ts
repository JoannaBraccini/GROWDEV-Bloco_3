import { StudentType } from "../types";

export const typeFormat = (studentType: StudentType) => {
  switch (studentType) {
    case "T":
      return "Tech-Helper";
    case "M":
      return "Aluno Matriculado";
    case "F":
      return "Aluno Formado";
    default:
      return "Tipo Desconhecido";
  }
};
