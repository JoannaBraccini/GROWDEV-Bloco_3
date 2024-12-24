import * as React from "react";
import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";

interface SnackbarToastProps {
  open: boolean;
  message: string;
  type: "success" | "error";
  onClose: (
    event: React.SyntheticEvent | Event,
    reason: SnackbarCloseReason
  ) => void;
}

export function SnackbarToast({
  open,
  message,
  type,
  onClose,
}: SnackbarToastProps) {
  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    onClose(_event, reason);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={message}
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
  );
}
