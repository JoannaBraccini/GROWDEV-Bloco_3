import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { AccountBox, Ballot, CalendarMonth } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TechHelperHome() {
  const navigate = useNavigate();
  return (
    <List
      sx={{
        mt: 15,
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <IconButton onClick={() => navigate("/assessments")}>
              <Ballot />
            </IconButton>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Assessments" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <IconButton onClick={() => navigate("/students")}>
              <AccountBox />
            </IconButton>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Students" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <IconButton>
              <CalendarMonth />
            </IconButton>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Tasks" />
      </ListItem>
    </List>
  );
}
