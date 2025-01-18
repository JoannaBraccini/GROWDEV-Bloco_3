import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { AccountBox, Ballot, CalendarMonth } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { findStudentAsyncThunk } from "../../store/modules/studentDetail/studentDetailSlice";

export default function StudentHome() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { student } = useAppSelector((state) => state.userLogged);
  const studentDetail = useAppSelector((state) => state.studentDetail);

  useEffect(() => {
    if (!studentDetail || studentDetail.id !== student.id)
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
        <ListItemText primary="Assessments" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <IconButton onClick={() => navigate(`/profile/${student.id}`)}>
              <AccountBox />
            </IconButton>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Student Profile" />
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
