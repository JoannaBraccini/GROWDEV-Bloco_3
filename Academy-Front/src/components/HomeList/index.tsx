import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { AccountBox, Ballot, CalendarMonth } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { showAlert } from "../../store/modules/alert/alertSlice";

export default function HomeList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { student } = useAppSelector((state) => state.userLogged);
  const { students } = useAppSelector((state) => state.students);

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
        <ListItemText
          primary="Avaliações"
          secondary={
            student.studentType !== "T" &&
            students.filter((user) => user.id === student.id)[0]?.assessments
              ?.length > 0
              ? students.filter((user) => user.id === student.id)[0].assessments
                  .length
              : null
          }
        />
      </ListItem>
      {student.studentType === "T" && (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <IconButton onClick={() => navigate("/students")}>
                <AccountBox />
              </IconButton>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Estudantes" secondary={students.length} />
        </ListItem>
      )}
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
