import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "App.css";
import { useRoutes } from "routes";
import { ToastContainer } from "react-toastify";
import { connect, useDispatch } from "react-redux";
import { login } from "redux/actions";
import { StateProps } from "redux/reducer";

const App = ({ isLogin }: { isLogin: boolean }) => {
  const dispatch = useDispatch();
  const isLoggedIn = isLogin || !!localStorage.getItem("userId");

  if (isLoggedIn !== isLogin) {
    dispatch(login(isLoggedIn));
  }

  const routes = useRoutes(isLoggedIn);

  return (
    <Router>
      {routes}
      <ToastContainer />
    </Router>
  );
};

const mapStateToProps = (state: StateProps) => ({
  isLogin: state.isLoggedIn,
});

export default connect(mapStateToProps)(App);
