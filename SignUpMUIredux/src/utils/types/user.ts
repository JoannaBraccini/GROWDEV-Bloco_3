export interface User {
  id: string;
  email: string;
  password: string; //no bd seria um hash
  createdAt: Date;
}

export interface SignupRequest {
  email: string;
  password: string;
  passwordConfirm: string;
}

export type LoginRequest = Pick<SignupRequest, "email" | "password">;
