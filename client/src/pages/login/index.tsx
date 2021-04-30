import { Typography, TextField, makeStyles, Button } from "@material-ui/core";
import React, { FormEvent, useState } from "react";
import { useHttp } from "hooks/http";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "50px 30px",
  },
  mb15: {
    marginBottom: "15px",
  },
}));

const Login = () => {
  const classes = useStyles();

  const [isRegistrationMode, setIsRegistrationMode] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { request } = useHttp();

  const handleInput = (
    event: FormEvent<HTMLDivElement>,
    setter: (value: string) => void
  ) => {
    // @ts-ignore
    const value = event.target.value;
    setter(value);
  };

  const register = async () => {
    const data = await request("/api/auth/register", "POST", {
      login,
      password,
    });
  };

  return !isRegistrationMode ? (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.mb15}>
        Login
      </Typography>
      <TextField
        variant="outlined"
        label="login"
        className={classes.mb15}
        value={login}
        onInput={(val) => handleInput(val, setLogin)}
      />
      <TextField
        variant="outlined"
        label="password"
        className={classes.mb15}
        type="password"
        value={password}
        onInput={(val) => handleInput(val, setPassword)}
      />
      <Button variant="contained" color="primary" className={classes.mb15}>
        Войти
      </Button>
      <Typography variant="body1" className={classes.mb15}>
        Нет учетной записи?
      </Typography>
      <Button
        variant="text"
        color="primary"
        onClick={() => setIsRegistrationMode(true)}
      >
        Зарегистрироваться
      </Button>
    </div>
  ) : (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.mb15}>
        Регистрация
      </Typography>
      <TextField
        variant="outlined"
        label="login"
        className={classes.mb15}
        value={login}
        onInput={(val) => handleInput(val, setLogin)}
      />
      <TextField
        variant="outlined"
        label="password"
        className={classes.mb15}
        type="password"
        value={password}
        onInput={(val) => handleInput(val, setPassword)}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.mb15}
        onClick={register}
      >
        Зарегистрироваться
      </Button>
    </div>
  );
};

export default Login;
