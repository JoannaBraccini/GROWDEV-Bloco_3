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

interface FormProps {
  method: "Login" | "Register" | "Forgot Password";
}

export function Form({ method }: FormProps) {
  return (
    <Container
      component="form"
      onMethodChange
      sx={{
        position: "absolute",
        top: 0,
        left: "300px",
      }}
    >
      <FormControl
        action="#"
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
        {method === "Forgot Password" && (
          <>
            <Typography
              variant="body1"
              sx={{
                fontSize: "15px",
                letterSpacing: ".5px",
                lineHeight: 1.8,
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
                marginBottom: ".7rem",
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
            placeholder="Password"
            name="password"
            required=""
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
              name="password"
              required=""
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
    </Container>
  );
}
