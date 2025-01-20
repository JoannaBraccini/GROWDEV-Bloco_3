import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { AccountBox, Ballot, CalendarMonth } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { showAlert } from "../../store/modules/alert/alertSlice";

export default function TechHelperHome() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleTasks = () => {
    dispatch(
      showAlert({
        message: "Nenhuma atividade em aberto",
        type: "warning",
      })
    );
  };
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
        <ListItemText primary="Avaliações" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <IconButton onClick={() => navigate("/students")}>
              <AccountBox />
            </IconButton>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Estudantes" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <IconButton onClick={handleTasks}>
              <CalendarMonth />
            </IconButton>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Tarefas" />
      </ListItem>
    </List>
  );
}
