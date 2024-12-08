import { Facebook, Google } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid2,
  Link,
  Typography,
} from "@mui/material";
import { FormLogin } from "../components/FormLogin";
import { Toast } from "../components/Toast";
import { useState } from "react";

export function Login() {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastProps, setToastProps] = useState({
    type: "success" as "success" | "error",
    message: "",
  });

  function handleToastClose() {
    setToastProps({
      message: "",
      type: "success",
    });
    setToastOpen(false);
  }

  function handleImplements() {
    setToastProps({
      type: "error",
      message: "Não implementado",
    });
    setToastOpen(true);
  }
  function handleUserMock() {
    setToastProps({
      type: "success",
      message: "joanna@email.com - senha123",
    });
    setToastOpen(true);
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background:
          "linear-gradient(90deg, #190024 0%, #630979 35%, #8c00ff 100%)",
      }}
    >
      <Container maxWidth="xs">
        <Card elevation={4} sx={{ p: 4 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <img
                src="https://www.growdev.com.br/assets/images/logo_growdev.svg"
                alt="Logo Growdev"
                width="100"
              />
            </Grid2>

            <Grid2 size={12}>
              <FormLogin />
            </Grid2>

            <Grid2 size={12} textAlign="center">
              <Link
                href="#"
                color="info"
                underline="hover"
                onClick={handleImplements}
              >
                Esqueceu a senha?
              </Link>
            </Grid2>

            <Grid2 size={12}>
              <Divider>ou</Divider>
            </Grid2>

            <Grid2 size={12}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Google />}
                onClick={handleImplements}
                color="secondary"
              >
                Entrar com Google
              </Button>
            </Grid2>

            <Grid2 size={12}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Facebook />}
                onClick={handleImplements}
                color="secondary"
              >
                Entrar com Facebook
              </Button>
            </Grid2>

            <Grid2 size={12} textAlign="center">
              <Typography>
                Não tem conta?{" "}
                <Link
                  href="#"
                  color="info"
                  underline="hover"
                  onClick={handleUserMock}
                >
                  Criar
                </Link>
              </Typography>
            </Grid2>
          </Grid2>
        </Card>
      </Container>
      <Toast
        message={toastProps.message}
        type={toastProps.type}
        isOpen={toastOpen}
        onClose={handleToastClose}
      />
    </Box>
  );
}
