import { Alert, Snackbar } from "@mui/material";

interface SnackbarToastProps {
  open: boolean;
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export function SnackbarToast({
  open,
  message,
  type,
  onClose,
}: SnackbarToastProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      message={message}
    >
      <Alert
        onClose={onClose}
        variant="filled"
        sx={{ width: "100%" }}
        severity={type}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
