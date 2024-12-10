import { Typography } from "@mui/material";

export function Header() {
  return (
    <Typography
      variant="h1"
      sx={{
        color: "white",
        fontSize: "2.7rem",
        textAlign: "center",
        padding: "2.3rem 0.9rem 0.9rem",
        letterSpacing: "3px",
        fontWeight: 600,
      }}
    >
      SIGN
    </Typography>
  );
}
