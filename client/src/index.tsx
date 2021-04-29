import React from 'react';
import { render } from 'react-dom';
import 'index.css';
import App from 'App';
import * as serviceWorker from 'serviceWorker';
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "redux/reducer";
import {Provider} from 'react-redux';
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk))

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

render(app, document.getElementById('root'));

serviceWorker.unregister();
