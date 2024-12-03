import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { ModalBox } from "./Modal";
import { useState } from "react";

export function Section() {
  const [openRegister, setOpenRegister] = useState(false);

  const handleClickOpen = () => {
    setOpenRegister(true);
  };

  const handleClose = () => {
    setOpenRegister(false);
  };

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url('https://img.freepik.com/fotos-gratis/ponte-de-madeira-na-ilha-de-koh-nangyuan-em-surat-thani-tailandia_335224-1082.jpg?t=st=1732748586~exp=1732752186~hmac=41bb1b7173546116311eaf22e82a8cbdb783d0b00ce51249c7618ef98ee51df3&w=1380')", // Imagem de fundo
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: "-1",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: "1",
        }}
      />
      <Container
        component="div"
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: "2",
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontSize: "3rem",
            fontWeight: "800",
            color: "ButtonFace",
          }}
        >
          DÊ FÉRIAS AO SEU CÉREBRO
        </Typography>
        <Divider />
        <Typography
          component="h3"
          sx={{ fontSize: "1.5rem", color: "ButtonFace", padding: "1rem" }}
        >
          Aproveite ofertas incríveis para os melhores locais.
        </Typography>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            backgroundColor: "#ff3366",
            zIndex: "3",
          }}
        >
          REGISTRAR
        </Button>
      </Container>
      <ModalBox open={openRegister} onClose={handleClose} />
    </Box>
  );
}
