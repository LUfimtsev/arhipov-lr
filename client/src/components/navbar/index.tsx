import React, { useEffect, useState } from "react";
import {
  AppBar,
  Divider,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";

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
    width: 2,
    minHeight: 64,
    backgroundColor: "#fff",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();

  const onClick = (url: string) => {
    history.push(url);
    setSelectedUrl(url);
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
        <Divider orientation="vertical" className={classes.divider} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
