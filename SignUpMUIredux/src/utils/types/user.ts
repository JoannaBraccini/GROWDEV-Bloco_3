export interface User {
  id: string;
  email: string;
  password: string; //no bd seria um hash
}

export interface SignupRequest extends Omit<User, "id"> {
  confirmPassword?: string;
}

export type LoginRequest = Pick<User, "email" | "password"> &
  Partial<Pick<User, "id">>;
