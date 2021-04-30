import React from "react";
import "index.css";
import * as serviceWorker from "serviceWorker";
import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "redux/reducer";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import App from "App";
import { render } from "react-dom";

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(app, document.getElementById("root"));

serviceWorker.unregister();
