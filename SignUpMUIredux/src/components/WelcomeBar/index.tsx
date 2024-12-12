import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/module/user/userLoggedSlice";
import { NavMenu } from "./Menu";

interface WelcomeBarProps {
  user: string;
}
export function WelcomeBar({ user }: WelcomeBarProps) {
  const dispatch = useAppDispatch();
  function handleLogout() {
    dispatch(logout());
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        variant="elevation"
        sx={{
          background: "transparent",
        }}
      >
        <Toolbar>
          <NavMenu />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
