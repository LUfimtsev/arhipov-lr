import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import useAsyncEffect from "use-async-effect";
import { log } from "hooks/http";

const useStyles = makeStyles(() => ({
  root: {
    padding: 15,
  },
}));

const Home = () => {
  const classes = useStyles();

  useAsyncEffect(async () => {
    await log("Переход на домашнюю страницу");
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h1">Home</Typography>
    </div>
  );
};

export default Home;
