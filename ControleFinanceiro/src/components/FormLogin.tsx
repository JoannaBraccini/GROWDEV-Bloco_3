import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../config/store/hooks";
import { login } from "../config/store/modules/userLoggedSlice";

interface ErrorFields {
  email?: string;
  password?: string;
}

export function FormLogin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userLoggedRedux = useAppSelector((state) => state.userLogged);

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ErrorFields>({
    email: "",
    password: "",
  });

  function validate(email: string, password: string) {
    if (!email) {
      setErrors({ email: "E-mail é obrigatório!" });
      return;
    }

    if (!password) {
      setErrors({ password: "Senha é obrigatória!" });
      return;
    }

    setErrors({});
  }

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const email = event.currentTarget["email"].value;
    const password = event.currentTarget.password.value;
    const remember = event.currentTarget["remember"].checked;

    validate(email, password);

    dispatch(login({ email, password, remember }));
  }

  useEffect(() => {
    // Se existir as infos do userLogged eu navego

    if (userLoggedRedux.id && !userLoggedRedux.errors) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [userLoggedRedux, navigate]);

  return (
    <Grid2 container spacing={2} component="form" onSubmit={handleLogin}>
      <Grid2 size={12}>
        <Typography variant="h4">Entrar</Typography>
      </Grid2>

      <Grid2 size={12}>
        <FormControl fullWidth error={!!errors.email}>
          <FormLabel id="email">E-mail</FormLabel>
          <TextField
            id="email"
            name="email"
            type="email"
            placeholder="exemplo@email.com"
            variant="outlined"
            fullWidth
            error={!!errors.email || !!userLoggedRedux.errors}
            helperText={errors.email || userLoggedRedux.errors}
            onChange={(e) => {
              if (e.target.value) {
                setErrors({ ...errors, email: "" });
              }
            }}
          />
        </FormControl>
      </Grid2>

      <Grid2 size={12}>
        <FormControl fullWidth error={!!errors.password}>
          <FormLabel id="password">Senha</FormLabel>
          <TextField
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="******"
            variant="outlined"
            fullWidth
            error={!!errors.password || !!userLoggedRedux.errors}
            helperText={errors.password || userLoggedRedux.errors}
            onChange={(e) => {
              if (e.target.value) {
                setErrors({ ...errors, password: "" });
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Grid2>

      <Grid2 size={12}>
        <FormControlLabel
          name="remember"
          control={<Checkbox />}
          label="Lembrar"
        />
      </Grid2>

      <Grid2 size={12}>
        <Button variant="contained" type="submit" color="secondary" fullWidth>
          Entrar
        </Button>
      </Grid2>
    </Grid2>
  );
}
