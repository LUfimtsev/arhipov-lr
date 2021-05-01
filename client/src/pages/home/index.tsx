import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    padding: 15,
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1">Home</Typography>
    </div>
  );
};

export default Home;
