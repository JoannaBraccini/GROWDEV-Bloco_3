import { Box } from "@mui/material";
import { Form } from "./Form";

export function RightContainer() {
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
      <Form />
    </Box>
  );
}
