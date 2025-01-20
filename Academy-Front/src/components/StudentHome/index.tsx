import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { AccountBox, Ballot, CalendarMonth } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { findStudentAsyncThunk } from "../../store/modules/students/studentsActions";
import { showAlert } from "../../store/modules/alert/alertSlice";

export default function StudentHome() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { student } = useAppSelector((state) => state.userLogged);
  const { loading } = useAppSelector((state) => state.studentDetail);

  const handleTasks = () => {
    dispatch(
      showAlert({
        message: "Nenhuma atividade em aberto",
        type: "warning",
      })
    );
  };

  useEffect(() => {
    dispatch(findStudentAsyncThunk(student.id));
  }, [student]);

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
            <IconButton onClick={() => navigate("/assessments/")}>
              <Ballot />
            </IconButton>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Avaliações" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            {loading ? (
              <CircularProgress />
            ) : (
              <IconButton onClick={() => navigate(`/profile/${student.id}`)}>
                <AccountBox />
              </IconButton>
            )}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Perfil do Estudante" />
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
