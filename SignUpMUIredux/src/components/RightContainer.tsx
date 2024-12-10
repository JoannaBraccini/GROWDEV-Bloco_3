import { Email, Key, Person } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  Link,
  TextField,
  Typography,
} from "@mui/material";

export function RightContainer() {
  return (
    <Box>
      {/* Form Login */}
      <Container
        article
        sx={{
          display: "none",
          left: "230px",
          minWidth: "570px",
          position: "absolute",
          top: 0,
        }}
      >
        <FormControl
          form
          action="#"
          method="post"
          sx={{
            background: "#ffff",
            padding: "2em",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "#000",
              fontSize: "24px",
              textAlign: "center",
              marginBottom: "1.2em",
              fontWeight: 400,
            }}
          >
            Entre aqui
          </Typography>
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
            <Avatar
              aria-hidden="true"
              sx={{
                fontSize: "15px",
                color: "#464646",
                marginRight: "10px",
              }}
            >
              <Email />
            </Avatar>
            <TextField
              input
              type="email"
              placeholder="Email"
              name="email"
              required=""
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
            <Avatar
              aria-hidden="true"
              sx={{
                fontSize: "15px",
                color: "#464646",
                marginRight: "10px",
              }}
            >
              <Key />
            </Avatar>
            <TextField
              input
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
          <Button
            type="submit"
            sx={{
              margin: "2.3em auto 0",
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
            Entrar
          </Button>
          <Link
            href="#"
            sx={{
              color: "#757474",
              fontSize: "14px",
              display: "inherit",
              letterSpacing: "1px",
              textAlign: "center",
              marginTop: "3.2em",
            }}
          >
            Esqueceu a Senha?
          </Link>
        </FormControl>
      </Container>
      {/* Form Register */}
      <Container
        article
        sx={{
          display: "none",
          left: "230px",
          minWidth: "570px",
          position: "absolute",
          top: 0,
        }}
      >
        <FormControl
          form
          action="#"
          method="post"
          sx={{
            background: "#ffff",
            padding: "2em",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "#000",
              fontSize: "24px",
              textAlign: "center",
              marginBottom: "1.2em",
              fontWeight: 400,
            }}
          >
            Registre Aqui
          </Typography>
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
            <Avatar
              aria-hidden="true"
              sx={{
                fontSize: "15px",
                color: "#464646",
                marginRight: "10px",
              }}
            >
              <Person />
            </Avatar>
            <TextField
              input
              type="text"
              placeholder="Username"
              name="name"
              required=""
              wfd-id="id4"
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
            <Avatar
              aria-hidden="true"
              sx={{
                fontSize: "15px",
                color: "#464646",
                marginRight: "10px",
              }}
            >
              <Key />
            </Avatar>
            <TextField
              type="password"
              placeholder="Password"
              name="password"
              required=""
              wfd-id="id5"
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
            <Avatar
              aria-hidden="true"
              sx={{
                fontSize: "15px",
                color: "#464646",
                marginRight: "10px",
              }}
            >
              <Key />
            </Avatar>
            <TextField
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
          <Button
            type="submit"
            sx={{
              margin: "2.3em auto 0",
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
            Registrar
          </Button>
        </FormControl>
      </Container>
      {/* Form forgot */}
      <Container
        article
        sx={{
          display: "none",
          left: "230px",
          minWidth: "570px",
          position: "absolute",
          top: 0,
        }}
      >
        <FormControl
          action="#"
          method="post"
          sx={{
            background: "#ffff",
            padding: "2em",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "#000",
              fontSize: "24px",
              textAlign: "center",
              marginBottom: "1.2em",
              fontWeight: 400,
            }}
          >
            Resetar Senha
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBottom: ".8em",
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
              marginBottom: "2em",
            }}
          >
            <Typography strong>Precisa de ajuda?</Typography> Aprenda mais sobre
            como <Link href="#">recuperar uma conta existente.</Link>
          </Typography>
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
            <Avatar
              aria-hidden="true"
              sx={{
                fontSize: "15px",
                color: "#464646",
                marginRight: "10px",
              }}
            >
              <Email />
            </Avatar>
            <TextField
              type="email"
              placeholder="Email"
              name="email"
              required=""
              wfd-id="id8"
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
          <Button
            type="submit"
            sx={{
              margin: "2.3em auto 0",
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
            Resetar
          </Button>
        </FormControl>
      </Container>
    </Box>
  );
}
