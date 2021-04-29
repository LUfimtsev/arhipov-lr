import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import 'App.css';
import {useRoutes} from "routes";

const App = () => {
    const routes = useRoutes();

    return (
        <Router>
            <div>
                {routes}
            </div>
        </Router>
    );
}


export default App;
