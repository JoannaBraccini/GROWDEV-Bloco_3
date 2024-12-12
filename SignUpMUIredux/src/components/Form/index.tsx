import { Key, Email, VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Container,
  FormControl,
  Typography,
  Box,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
  SnackbarCloseReason,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import {
  login,
  clearUserMessage,
} from "../../store/module/user/userLoggedSlice";
import {
  FieldsErrors,
  validateSignup,
} from "../../utils/validations/sign.validation";
import { clearMessage, signup } from "../../store/module/user/authSlice";
import { SnackbarToast } from "../Snackbar";
import { useNavigate } from "react-router";

interface FormProps {
  method: "Login" | "Register" | "Forgot Password";
}
interface ToastProps {
  type: "success" | "error";
  message: string;
}

export function Form({ method }: FormProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((state) => state.auth);
  const userLoggedRedux = useAppSelector((state) => state.userLogged);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FieldsErrors>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [toastOpen, setToastOpen] = useState(false);
  const [toastProps, setToastProps] = useState<ToastProps>({
    type: "error",
    message: "",
  });

  const showToast = (type: ToastProps["type"], message: string) => {
    setToastProps({ type, message });
    setToastOpen(true);
  };

  useEffect(() => {
    if (authRedux.message || userLoggedRedux.message) {
      const message = authRedux.message || userLoggedRedux.message;
      showToast(
        authRedux.success || userLoggedRedux.success ? "success" : "error",
        message
      );
      setTimeout(() => {
        dispatch(clearUserMessage()); // Limpa a mensagem do User
        dispatch(clearMessage()); // Limpa a mensagem do Auth
      }, 2000);
    }

    if (userLoggedRedux.id) {
      setToastOpen(true);
      setTimeout(() => {
        navigate("/home");
        dispatch(clearUserMessage()); // Limpa a mensagem do User após redirecionamento
      }, 2000);
    }
  }, [authRedux, navigate, dispatch, userLoggedRedux]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    // Register
    if (method === "Register") {
      const confirmPassword = formData.get("confirm-password") as string;
      const errors = validateSignup(email, password, confirmPassword);
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        showToast("error", Object.values(errors).join("\n"));
        return;
      }

      setFormErrors({} as FieldsErrors);
      dispatch(signup({ email, password }));

      // login
    } else if (method === "Login") {
      const userFound = authRedux.users.find((user) => user.email === email);
      if (!userFound) {
        const errorMessage = "Usuário não encontrado";
        setFormErrors({ email: errorMessage } as FieldsErrors);
        showToast("error", errorMessage);
        setToastOpen(true);
        return;
      } else {
        setFormErrors({} as FieldsErrors);
        dispatch(login(userFound));
      }
    }
    // forgot
    if (method === "Forgot Password") {
      handleForgot(email);
    }
  }

  function handleForgot(email: string) {
    showToast("success", `Recuperar senha para: ${email}`);
  }

  function handleClose(
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(false);
    dispatch(clearMessage());
    dispatch(clearUserMessage());
  }

  return (
    <Container
      sx={{
        position: "absolute",
        top: 0,
        left: "300px",
      }}
    >
      <FormControl
        component="form"
        onSubmit={handleSubmit}
        sx={{
          background: "#ffff",
          padding: "1.5em",
          height: "371px",
          minWidth: "570px",
        }}
      >
        {/* Título */}
        <Typography
          variant="h3"
          sx={{
            color: "#000",
            fontSize: "24px",
            textAlign: "center",
            marginBottom: "1rem",
            fontWeight: 400,
          }}
        >
          {method === "Login"
            ? "Entre aqui"
            : method === "Register"
            ? "Registre aqui"
            : "Resetar Senha"}
        </Typography>
        {/* resetar */}
        {method === "Forgot Password" && (
          <>
            <Typography
              variant="body1"
              sx={{
                fontSize: "15px",
                letterSpacing: ".5px",
                lineHeight: 1.8,
                marginY: "1rem",
              }}
            >
              Digite seu e-mail abaixo e enviaremos um e-mail com as instruções.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "15px",
                letterSpacing: ".5px",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>
                Precisa de ajuda?
              </Typography>{" "}
              Aprenda mais sobre como{" "}
              <Link href="#">recuperar uma conta existente.</Link>
            </Typography>
          </>
        )}
        {/* Email */}
        <Box
          sx={{
            marginBottom: "1em",
            padding: "13px 15px",
            border: "1px solid #eee",
            background: "#eee",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Email
            sx={{
              fontSize: "15px",
              color: "#464646",
              marginRight: "10px",
            }}
          />
          <TextField
            size="small"
            variant="standard"
            fullWidth
            type="email"
            placeholder="E-mail"
            name="email"
            required
            error={!!formErrors.email}
            helperText={formErrors.email}
            wfd-id="id1"
            sx={{
              color: "#000",
              fontSize: "14px",
              letterSpacing: "1px",
              border: "none",
              outline: "none",
              background: "transparent",
              width: "100%",
            }}
          />
        </Box>
        {/* Senha */}
        {method !== "Forgot Password" && (
          <>
            <Box
              sx={{
                marginBottom: "1em",
                padding: "13px 15px",
                border: "1px solid #eee",
                background: "#eee",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Key
                sx={{
                  fontSize: "15px",
                  color: "#464646",
                  marginRight: "10px",
                }}
              />

              <TextField
                size="small"
                variant="standard"
                fullWidth
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                name="password"
                required
                error={!!formErrors.password}
                helperText={formErrors.password}
                wfd-id="id2"
                sx={{
                  color: "#000",
                  fontSize: "14px",
                  letterSpacing: "1px",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  width: "100%",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            {/* Confirmar senha*/}
            {method === "Register" && (
              <Box
                sx={{
                  marginBottom: "0.4em",
                  padding: "13px 15px",
                  border: "1px solid #eee",
                  background: "#eee",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Key
                  sx={{
                    fontSize: "15px",
                    color: "#464646",
                    marginRight: "10px",
                  }}
                />
                <TextField
                  size="small"
                  variant="standard"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirmar Senha"
                  name="confirm-password"
                  required
                  error={!!formErrors.confirmPassword}
                  helperText={formErrors.confirmPassword}
                  wfd-id="id6"
                  sx={{
                    color: "#000",
                    fontSize: "14px",
                    letterSpacing: "1px",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    width: "100%",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            )}
          </>
        )}
        {/* botão submit */}
        <Button
          type="submit"
          sx={{
            margin: "auto 0",
            background: "#00ad45",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            transition: "0.5s all",
            display: "block",
            color: "#fff",
            padding: "14px 30px",
            borderRadius: 0,
            fontSize: "15px",
            letterSpacing: "2px",
            width: "100%",
          }}
        >
          {method === "Login"
            ? "Entrar"
            : method === "Register"
            ? "Cadastrar"
            : "Resetar"}
        </Button>
        {/* Esqueceu a senha */}
        {method === "Login" && (
          <Link
            href="#"
            sx={{
              color: "#757474",
              fontSize: "14px",
              display: "inherit",
              letterSpacing: "1px",
              margin: "1.2rem auto auto",
            }}
          >
            Esqueceu a Senha?
          </Link>
        )}
      </FormControl>
      <SnackbarToast
        open={toastOpen}
        type={toastProps.type}
        message={toastProps.message}
        onClose={handleClose}
      />
    </Container>
  );
}
