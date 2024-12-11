import { Box } from "@mui/material";
import { Form } from "./Form";

interface RightContainerProps {
  method: "Login" | "Register" | "Forgot Password";
}

export function RightContainer({ method }: RightContainerProps) {
  return (
    <Box
      sx={{
        position: "relative",
        right: "25%",
        zIndex: 100,
        cursor: "pointer",
        fontSize: "17px",
        textAlign: "center",
        backgroundColor: "#fff",
        color: "#111",
      }}
    >
      <Form method={method} />
    </Box>
  );
}
