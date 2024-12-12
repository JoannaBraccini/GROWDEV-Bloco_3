import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { AccountCircle, AppRegistration, Lock } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import img from "../../assets/img.jpg";
interface LeftContainerProps {
  onMethodChange: (method: "Login" | "Register" | "Forgot Password") => void;
}

export function LeftContainer({ onMethodChange }: LeftContainerProps) {
  const [view, setView] = React.useState("login");

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    nextView: string
  ) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const method = event.currentTarget.ariaLabel as
      | "Login"
      | "Register"
      | "Forgot Password";
    onMethodChange(method);
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
            color: "#111 !important",
            backgroundColor: "#fff !important",
          },
          "& .Mui-selected": {
            backgroundColor: "#00AD45 !important",
            color: "#fff !important",
            "&:hover": {
              backgroundColor: "#00AD45 !important",
            },
          },
        }}
      >
        <ToggleButton value="login" aria-label="Login" onClick={handleClick}>
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
        <ToggleButton
          value="register"
          aria-label="Register"
          onClick={handleClick}
        >
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
        <ToggleButton
          value="forgot"
          aria-label="Forgot Password"
          onClick={handleClick}
        >
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
