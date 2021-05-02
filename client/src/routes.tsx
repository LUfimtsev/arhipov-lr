import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "pages/login";
import Home from "pages/home";
import Navbar from "components/navbar";
import Status from "pages/status";
import InvoiceActs from "components/invoice-acts";
import Log from "pages/log";

export const useRoutes = (isLogged: boolean) => {
  if (isLogged) {
    return (
      <>
        <Navbar />
        <Switch>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/invoices">
            <InvoiceActs />
          </Route>
          <Route path="/act">
            <InvoiceActs isAct />
          </Route>
          <Route path="/status">
            <Status />
          </Route>
          <Route path="/log">
            <Log />
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
