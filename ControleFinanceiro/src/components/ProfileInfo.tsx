import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import { amber, purple } from "@mui/material/colors";
import { useAppSelector } from "../config/store/hooks";
import { Box, Card, CardContent } from "@mui/material";
import { Email, Link } from "@mui/icons-material";

export interface ProfileInfoProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function ProfileInfo(props: ProfileInfoProps) {
  const { onClose, selectedValue, open } = props;
  const userLoggedRedux = useAppSelector((state) => state.userLogged);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Alterar dados da conta</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem disablePadding key={userLoggedRedux.name}>
          <ListItemButton
            onClick={() => handleListItemClick(userLoggedRedux.name)}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: purple[100], color: purple[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={userLoggedRedux.name} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding key={userLoggedRedux.email}>
          <ListItemButton
            onClick={() => handleListItemClick(userLoggedRedux.email)}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: purple[100], color: purple[600] }}>
                <Email />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={userLoggedRedux.email} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick("addPhoto")}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: purple[100], color: purple[600] }}>
                <Link />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Adicionar Foto" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

export function ProfileInfoModal() {
  const userLoggedRedux = useAppSelector((state) => state.userLogged);

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(
    userLoggedRedux.name
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Card
      sx={{
        backgroundColor: amber[50],
        boxShadow: 3,
        borderRadius: 2,
        mb: 3,
        maxWidth: "40%",
      }}
    >
      <CardContent>
        <Box display={"flex"} gap={4}>
          <Box>
            <Avatar
              sx={{
                width: "100px",
                height: "100px",
                border: "5px solid purple",
              }}
              src={userLoggedRedux.avatar}
            />
          </Box>
          <Box textAlign={"left"} m={"1rem 0"}>
            <Typography>Nome: {userLoggedRedux.name}</Typography>
            <Typography>Email: {userLoggedRedux.email}</Typography>
          </Box>
        </Box>
        <Button variant="text" color="secondary" onClick={handleClickOpen}>
          Alterar dados
        </Button>
        <ProfileInfo
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      </CardContent>
    </Card>
  );
}
