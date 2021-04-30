import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "pages/login";
import Home from "pages/home";

export const useRoutes = (isLogged: boolean) => {
  if (isLogged) {
    return (
      <>
        <Switch>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Redirect to="/home" />
        </Switch>
      </>
    );
  }

  return (
    <Switch>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );
};
