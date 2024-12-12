export interface FieldsErrors {
  email: string;
  password: string;
  confirmPassword?: string;
}

export function validateSignup(
  email: string,
  password: string,
  confirmPassword: string
) {
  const errors: FieldsErrors = {} as FieldsErrors;

  if (email.length < 3) {
    errors.email = "Digite um e-mail válido";
  }

  if (password.length < 3) {
    errors.password = "A senha deve ter pelo menos 6 caracteres";
  }

  if (confirmPassword !== password) {
    errors.confirmPassword = "As senhas devem ser iguais";
  }

  return errors;
}
