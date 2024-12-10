import { Box, Typography, Link } from "@mui/material";

export function Footer() {
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Typography
        variant="button"
        sx={{
          color: "white",
          fontSize: "15px",
          letterSpacing: "1px",
          lineHeight: 1.8,
        }}
      >
        © 2024 Joanna Braccini - Desenvolvido na{" "}
        <Link
          sx={{ color: "white" }}
          href="https://growdev.com,br"
          target="_blank"
        >
          Growdev
        </Link>
      </Typography>
    </Box>
  );
}
