import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { AccountCircle, AppRegistration, Lock } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import img from "../assets/img.jpg";

export default function LeftContainer() {
  const [view, setView] = React.useState("login");

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    nextView: string
  ) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  return (
    <>
      <Box
        sx={{
          background: `url(${img}) no-repeat center`,
          backgroundSize: "cover",
          minHeight: "371px",
          float: "left",
          width: "25%",
        }}
      ></Box>
      <ToggleButtonGroup
        orientation="vertical"
        value={view}
        exclusive
        onChange={handleChange}
        sx={{
          "& .MuiToggleButton-root": {
            backgroundColor: "#fff",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontSize: "17px",
            padding: "28px 20px",
            position: "relative",
            width: "189px",
            zIndex: 100,
            textAlign: "center",
            // color: "#111",
          },
          "& .Mui-selected": {
            backgroundColor: "#00AD45",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#00AD45",
            },
          },
        }}
      >
        <ToggleButton value="login" label="Login" aria-label="Login">
          <AccountCircle
            sx={{
              fontSize: "30px",
              margin: "7.8px",
            }}
          />
          <Typography variant="caption" sx={{ fontWeight: "bold" }}>
            Login
          </Typography>
        </ToggleButton>
        <ToggleButton value="register" aria-label="Register">
          <AppRegistration
            sx={{
              fontSize: "30px",
              margin: "7.8px",
            }}
          />
          <Typography variant="caption" sx={{ fontWeight: "bold" }}>
            Register
          </Typography>
        </ToggleButton>
        <ToggleButton value="forgot" aria-label="Forgot Password?">
          <Lock
            sx={{
              fontSize: "30px",
              margin: "7.8px",
            }}
          />
          <Typography variant="caption" sx={{ fontWeight: "bold" }}>
            Forgot Password?
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}