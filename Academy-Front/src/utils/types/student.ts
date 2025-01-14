export interface SignupRequest {
  name: string;
  cpf: string;
  age?: number;
  email: string;
  password: string;
  type: "M" | "F" | "T";
}

export type StudentType = Pick<SignupRequest, "type">;
