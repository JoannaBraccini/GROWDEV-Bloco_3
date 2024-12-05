import { Box, Link, Typography } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { amber } from "@mui/material/colors";

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
      bgcolor={amber[600]}
    >
      <Typography variant="button">Desenvolvido por Joanna Braccini</Typography>
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
          variant="button"
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
