import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SignIn from './components/Jss/Accounts/SignIn'
import SignUp from './components/Jss/Accounts/SignUp'
import ErrorPage from './components/Jss/ErrorPage'
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

// ReactDOM.render(<App />, document.getElementById('root'));
var hist = createBrowserHistory();
ReactDOM.render(
    <Router history={hist}>
      <Switch>
        <Route path="/SignUp" component={SignUp} />
        <Route path="/SignIn" component={SignIn} />
        <Route path="/ErrorPage" component={ErrorPage} />
        <Route path="/" component={App} />
      </Switch>
    </Router>,
    document.getElementById("root"));

serviceWorker.unregister();
