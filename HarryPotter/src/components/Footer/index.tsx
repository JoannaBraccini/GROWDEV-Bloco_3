import { Box, AppBar, Toolbar, Typography } from "@mui/material";

export function Footer() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        color="transparent"
        sx={{
          top: "auto",
          bottom: 0,
          boxShadow: "-2px -7px 5px 0px rgba(0,0,0,0.53)",
        }}
      >
        <Toolbar
          variant="dense"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Typography
            variant="button"
            component="div"
            sx={{
              color: "white",
            }}
          >
            <Box
              component="span"
              sx={{ display: { xs: "none", sm: "inline" } }}
            >
              Desenvolvido por
            </Box>{" "}
            Joanna Braccini{" "}
            <Box
              component="div"
              sx={{
                display: { xs: "block", sm: "inline" },
              }}
            >
              {" "}
              © 2024 - Growdev
            </Box>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
