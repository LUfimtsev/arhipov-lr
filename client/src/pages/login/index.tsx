import { Typography, TextField, makeStyles, Button } from "@material-ui/core";
import React, { FormEvent, useState } from "react";
import { useHttp } from "hooks/http";
import { useDispatch } from "react-redux";
import { login } from "redux/actions";

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
  textField: {
    marginBottom: "15px",
    width: 250,
  },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isRegistrationMode, setIsRegistrationMode] = useState(false);
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState("");
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
    try {
      setError("");
      await request("/api/auth/register", "POST", {
        login: loginValue,
        password: passwordValue,
      });
      localStorage.setItem("isLoggedIn", "true");
      dispatch(login(true));
    } catch (e) {
      setError(e.message);
    }
  };

  const signIn = async () => {
    try {
      setError("");
      await request("/api/auth/login", "POST", {
        login: loginValue,
        password: passwordValue,
      });
      localStorage.setItem("isLoggedIn", "true");
      dispatch(login(true));
    } catch (e) {
      setError(e.message);
    }
  };

  return !isRegistrationMode ? (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.mb15}>
        Login
      </Typography>
      <TextField
        variant="outlined"
        label="login"
        className={classes.textField}
        value={loginValue}
        onInput={(val) => handleInput(val, setLoginValue)}
        error={error !== ""}
      />
      <TextField
        variant="outlined"
        label="password"
        className={classes.textField}
        type="password"
        value={passwordValue}
        onInput={(val) => handleInput(val, setPasswordValue)}
        error={error !== ""}
        helperText={error}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.mb15}
        onClick={signIn}
      >
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
        className={classes.textField}
        value={loginValue}
        onInput={(val) => handleInput(val, setLoginValue)}
        error={error !== ""}
      />
      <TextField
        variant="outlined"
        label="password"
        className={classes.textField}
        type="password"
        value={passwordValue}
        onInput={(val) => handleInput(val, setPasswordValue)}
        error={error !== ""}
        helperText={error}
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
