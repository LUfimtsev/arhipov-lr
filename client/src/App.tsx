import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "App.css";
import { useRoutes } from "routes";

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const routes = useRoutes(!!isLoggedIn);

  return <Router>{routes}</Router>;
};

export default App;
