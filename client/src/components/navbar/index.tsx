import React, { useEffect, useState } from "react";
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import { log } from "hooks/http";
import { useDispatch } from "react-redux";
import { login } from "redux/actions";

const useStyles = makeStyles(() => ({
  link: {
    margin: 5,
    padding: 10,
    cursor: "pointer",
    height: 34,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#737db9",
      transition: "0.4s",
    },
    "&.selected": {
      backgroundColor: "#737db9",
    },
  },
  divider: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const onClick = (url: string) => {
    history.push(url);
    setSelectedUrl(url);
  };
  const logOut = async () => {
    await log("Выход из системы");
    localStorage.removeItem("userId");
    history.push("/login");
    dispatch(login(false));
  };

  const [selectedUrl, setSelectedUrl] = useState(history.location.pathname);

  useEffect(() => {
    setSelectedUrl(history.location.pathname);
  }, [history.location.pathname]);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => onClick("/home")}
        >
          <HomeIcon />
        </IconButton>
        <Typography
          variant="body1"
          className={`${classes.link} ${
            selectedUrl === "/invoices" ? "selected" : null
          }`}
          onClick={() => onClick("/invoices")}
        >
          Накладные
        </Typography>
        <Typography
          variant="body1"
          className={`${classes.link} ${
            selectedUrl === "/act" ? "selected" : null
          }`}
          onClick={() => onClick("/act")}
        >
          Акт приемки-передачи
        </Typography>
        <Typography
          variant="body1"
          className={`${classes.link} ${
            selectedUrl === "/status" ? "selected" : null
          }`}
          onClick={() => onClick("/status")}
        >
          Данные о товарах
        </Typography>
        <Typography
          variant="body1"
          className={`${classes.link} ${
            selectedUrl === "/log" ? "selected" : null
          }`}
          onClick={() => onClick("/log")}
        >
          История действий
        </Typography>
        <div className={classes.divider} />
        <Typography variant="body1" className={classes.link} onClick={logOut}>
          Выход
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
