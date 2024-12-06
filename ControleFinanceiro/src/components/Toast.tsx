import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import Alert from "@mui/material/Alert";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

interface ToastProps {
  isOpen: boolean;
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export function Toast({ isOpen, message, type, onClose }: ToastProps) {
  // Fechamento
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return; //ignora clique fora
    onClose();
  };

  return (
    <div>
      <Snackbar
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        key={SlideTransition.name}
        autoHideDuration={3000} // Tempo de exibição
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Posição no topo direito
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          sx={{ width: "100%" }}
          severity={type}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
