import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid2,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { StudentType } from "../../utils/types";
import { signupAsyncThunk } from "../../store/modules/auth/signupSlice";

interface ErrorFields {
  name?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
  studentType?: string;
  cpf?: string;
}

export function FormSignup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userLogged = useAppSelector((state) => state.userLogged);
  const userCreated = useAppSelector((state) => state.userCreated);

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ErrorFields>({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    studentType: "",
    cpf: "",
  });

  function validate(
    name: string,
    cpf: string,
    email: string,
    password: string,
    repeatPassword: string,
    studentType: StudentType
  ) {
    if (!name) {
      setErrors({ name: "Nome é obrigatório!" });
      return;
    }

    if (!cpf) {
      setErrors({ cpf: "CPF é obrigatório!" });
      return;
    } else if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      setErrors({ cpf: "CPF Inválido!" });
      return;
    }
    if (!email) {
      setErrors({ email: "E-mail é obrigatório!!" });
      return;
    }
    if (!password) {
      setErrors({ password: "Senha é obrigatória!" });
      return;
    }
    if (!repeatPassword) {
      setErrors({ repeatPassword: "Senha deve ser confirmada!" });
      return;
    } else if (repeatPassword !== password) {
      setErrors({ password: "As senhas devem ser iguais!" });
      return;
    }
    if (!studentType) {
      setErrors({ email: "Tipo é obrigatório!" });
      return;
    }

    setErrors({});
  }

  function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = event.currentTarget["student-name"].value;
    const cpf = event.currentTarget.cpf.value;
    const age = Number(event.currentTarget.age.value);
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    const repeatPassword = event.currentTarget["repeat-password"].value;
    const studentType = event.currentTarget["student-type"].value;

    validate(name, cpf, email, password, repeatPassword, studentType);
    dispatch(
      signupAsyncThunk({ name, email, password, studentType, cpf, age })
    );
    if (userCreated) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }

  useEffect(() => {
    // Se existir as infos do userLogged eu navego
    if (userLogged.ok && userLogged.token) {
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    }
  }, [userLogged, navigate]);

  return (
    <Grid2
      container
      spacing={2}
      component="form"
      onSubmit={(e) => handleSignup(e)}
    >
      <Grid2 size={12}>
        <Typography variant="h4">Cadastrar</Typography>
      </Grid2>

      <Grid2 size={12}>
        <FormControl fullWidth error={!!errors.name}>
          <TextField
            id="student-name"
            name="student-name"
            type="text"
            placeholder="Nome"
            variant="outlined"
            size="small"
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
            onChange={(e) => {
              if (e.target.value) {
                setErrors({ ...errors, name: "" });
              }
            }}
          />
        </FormControl>
      </Grid2>

      <Grid2 size={12}>
        <FormControl fullWidth error={!!errors.cpf}>
          <TextField
            id="cpf"
            name="cpf"
            type="number"
            placeholder="CPF"
            variant="outlined"
            size="small"
            fullWidth
            slotProps={{ htmlInput: { maxLength: 11 } }}
            error={!!errors.cpf}
            helperText={errors.cpf}
            onChange={(e) => {
              if (e.target.value) {
                setErrors({ ...errors, cpf: "" });
              }
            }}
          />
        </FormControl>
      </Grid2>

      <Grid2 size={12}>
        <FormControl fullWidth>
          <TextField
            id="age"
            name="age"
            type="number"
            placeholder="Idade"
            variant="outlined"
            size="small"
            fullWidth
            slotProps={{ htmlInput: { min: 16 } }}
          />
        </FormControl>
      </Grid2>

      <Grid2 size={12}>
        <FormControl fullWidth error={!!errors.email}>
          <TextField
            id="email"
            name="email"
            type="email"
            placeholder="E-mail"
            variant="outlined"
            size="small"
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
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
          <TextField
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            variant="outlined"
            size="small"
            fullWidth
            error={!!errors.password}
            helperText={errors.password}
            onChange={(e) => {
              if (e.target.value) {
                setErrors({ ...errors, password: "" });
              }
            }}
            slotProps={{
              input: {
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
              },
            }}
          />
        </FormControl>
      </Grid2>
      <Grid2 size={12}>
        <FormControl fullWidth error={!!errors.repeatPassword}>
          <TextField
            id="repeat-password"
            name="repeat-password"
            type={showPassword ? "text" : "password"}
            placeholder="Repetir Senha"
            variant="outlined"
            size="small"
            fullWidth
            error={!!errors.repeatPassword}
            helperText={errors.repeatPassword}
            onChange={(e) => {
              if (e.target.value) {
                setErrors({ ...errors, repeatPassword: "" });
              }
            }}
            slotProps={{
              input: {
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
              },
            }}
          />
        </FormControl>
      </Grid2>

      <Grid2 size={12}>
        <FormControl fullWidth error={!!errors.studentType}>
          <TextField
            id="student-type"
            name="student-type"
            select
            variant="outlined"
            size="small"
            fullWidth
            error={!!errors.studentType}
            helperText={errors.studentType}
            onChange={(e) => {
              if (e.target.value) {
                setErrors({ ...errors, studentType: "" });
              }
            }}
            slotProps={{
              select: {
                native: true,
              },
            }}
          >
            <option value="">Selecione o Tipo de Estudante</option>
            <option value="M">Matriculado</option>
            <option value="F">Formado</option>
            <option value="T">Tech-Helper</option>
          </TextField>
        </FormControl>
      </Grid2>
      <Grid2 size={12}>
        <Button
          variant="contained"
          type="submit"
          sx={{ textTransform: "capitalize" }}
          fullWidth
          disabled={userCreated.loading}
        >
          {userCreated.loading ? "Aguarde" : "Cadastrar"}
        </Button>
      </Grid2>
    </Grid2>
  );
}
