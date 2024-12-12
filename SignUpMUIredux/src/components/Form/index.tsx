import { Key, Email } from "@mui/icons-material";
import {
  Container,
  FormControl,
  Typography,
  Box,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { login } from "../../store/module/user/userLoggedSlice";
import {
  FieldsErrors,
  validateSignup,
} from "../../utils/validations/sign.validation";
import { resetState, signup } from "../../store/module/user/authSlice";
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
  const { errors, success, users } = useAppSelector((state) => state.auth);
  const userLoggedRedux = useAppSelector((state) => state.userLogged);
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

  // useEffect(() => {
  //   if (errors) {
  //     setToastProps({ type: "error", message: errors });
  //     setToastOpen(true);
  //   } else if (success) {
  //     setToastProps({
  //       type: "success",
  //       message: "Sucesso",
  //     });
  //     setToastOpen(true);
  //   } else if (userLoggedRedux.errors) {
  //     setToastProps({ type: "error", message: userLoggedRedux.errors });
  //     setToastOpen(true);
  //   }
  //   console.log("useeffect", errors);
  //   return () => {
  //     dispatch(resetState());
  //   };
  // }, [errors, success, userLoggedRedux.errors, dispatch]);

  useEffect(() => {
    if (userLoggedRedux.id && !userLoggedRedux.errors) {
      setToastProps({ type: "success", message: "Logado com sucesso" });
      setToastOpen(true);
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    }
  }, [userLoggedRedux, navigate]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const email = e.currentTarget["email"].value;
    const password = e.currentTarget["password"].value;
    // Register
    if (method === "Register") {
      const confirmPassword = e.currentTarget["confirm-password"].value;
      const errors = validateSignup(email, password, confirmPassword);
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        setToastProps({
          type: "error",
          message: Object.values(errors).join("\n"),
        });
        setToastOpen(true);
        return;
      }
      setFormErrors({} as FieldsErrors);
      dispatch(signup({ email, password }));

      // login
    } else if (method === "Login") {
      const userFound = users.find(
        (user) => user.email === email && user.password === password
      );
      if (!userFound) {
        const errorMessage = "Usuário não encontrado";
        setFormErrors({ email: errorMessage } as FieldsErrors);
        setToastProps({ type: "error", message: errorMessage });
        setToastOpen(true);
        return;
      } else {
        setFormErrors({} as FieldsErrors);
        dispatch(login(userFound));
      }
    }
    // forgot
    if (method === "Forgot Password") {
      setToastProps({
        type: "success",
        message: `Recuperar senha para: ${email}`,
      });
      setToastOpen(true);
      console.log("forgot", email);
    }
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
            placeholder="Email"
            name="email"
            required
            // error={!!formErrors.email || !!userLoggedRedux.errors}
            // helperText={formErrors.email || userLoggedRedux.errors}
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
                marginBottom: "1.5em",
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
                type="password"
                placeholder="Password"
                name="password"
                required
                // error={!!formErrors.password || !!userLoggedRedux.errors}
                // helperText={formErrors.password || userLoggedRedux.errors}
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
              />
            </Box>
            {/* Confirmar senha*/}
            {method === "Register" && (
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
                  type="password"
                  placeholder="Confirm Password"
                  name="confirm-password"
                  required
                  // error={!!formErrors.confirmPassword || !!userLoggedRedux.errors}
                  // helperText={formErrors.confirmPassword || userLoggedRedux.errors}
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
        onClose={() => setToastOpen(false)}
      />
    </Container>
  );
}
