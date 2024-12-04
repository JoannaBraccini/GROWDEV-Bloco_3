import { Box, Link, Typography } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";

export function Footer() {
  return (
    <Box
      component="footer"
      height="auto"
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      py={2}
      bgcolor="rgba(5, 58, 5, 0.8)"
      color={"white"}
    >
      <Typography variant="body1">Desenvolvido por Joanna Braccini</Typography>
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "flex",
          },
        }}
      >
        <CopyrightIcon sx={{ width: 15, mx: 0.5 }} />
        <Link
          href="https://www.growdev.com.br/"
          target="_blank"
          underline="hover"
          color="inherit"
          rel="noopener"
        >
          Growdev
        </Link>
      </Box>
    </Box>
  );
}
